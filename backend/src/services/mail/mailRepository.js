const isSql = () => (process.env.TASK_STORE || '').toLowerCase() === 'sql';

// Resolve SQL Mail model
const getSqlMail = async () => {
  try {
    const mod = await import('../../models/mailModel.js');
    return mod.default;
  } catch (_) {}
  throw new Error('Mail model not found');
};

export const saveMail = async ({ senderId, senderEmail, recipientEmail, subject, body, status = 'sent', direction = 'sent' }) => {
  if (isSql()) {
    const SqlMail = await getSqlMail();
    const row = await SqlMail.create({ senderId, senderEmail, recipientEmail, subject, body, status, direction, deleted: false });
    const obj = row.toJSON();
    return { ...obj, id: obj.mailId };
  }
  const { Mail } = await import('../../nosql/mailModel.js');
  const doc = await Mail.create({ senderId, senderEmail, recipientEmail, subject, body, status, direction, deleted: false });
  const obj = doc.toObject();
  return { ...obj, id: obj.mailId };
};

export const getMailHistory = async ({ userId }) => {
  if (isSql()) {
    const SqlMail = await getSqlMail();
    const rows = await SqlMail.findAll({
      where: { senderId: userId, deleted: false },
      order: [['createdAt', 'DESC']]
    });
    return rows.map(r => ({ ...r.toJSON(), id: r.mailId }));
  }
  const { Mail } = await import('../../nosql/mailModel.js');
  const docs = await Mail.find({ senderId: userId, deleted: false }).sort({ createdAt: -1 });
  return docs.map(d => ({ ...d.toObject(), id: d.mailId }));
};

export const getMailById = async ({ userId, mailId }) => {
  if (isSql()) {
    const SqlMail = await getSqlMail();
    const row = await SqlMail.findOne({ where: { mailId, senderId: userId, deleted: false } });
    if (!row) return null;
    const obj = row.toJSON();
    return { ...obj, id: obj.mailId };
  }
  const { Mail } = await import('../../nosql/mailModel.js');
  const doc = await Mail.findOne({ mailId: Number(mailId), senderId: userId, deleted: false });
  if (!doc) return null;
  const obj = doc.toObject();
  return { ...obj, id: obj.mailId };
};

export const deleteMail = async ({ userId, mailId }) => {
  if (isSql()) {
    const SqlMail = await getSqlMail();
    const [count] = await SqlMail.update(
      { deleted: true },
      { where: { mailId, senderId: userId } }
    );
    return count > 0;
  }
  const { Mail } = await import('../../nosql/mailModel.js');
  const res = await Mail.updateOne(
    { mailId: Number(mailId), senderId: userId },
    { deleted: true }
  );
  return res.modifiedCount > 0;
};
