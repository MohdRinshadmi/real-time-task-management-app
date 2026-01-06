// Username validation for login/register
export const loginUsernameValidator = (item) => {
  const rules = {
    required: {
      value: true,
      message: "Username is required",
    },
  };
  if (item.type === "text") {
    if (item?.validation?.min) {
      rules.minLength = {
        value: item.validation.min,
        message: `Minimum length is ${item.validation.min}`,
      };
    }
    if (item?.validation?.max) {
      rules.maxLength = {
        value: item.validation.max,
        message: `Maximum length is ${item.validation.max}`,
      };
    }
    rules.pattern = {
      value: /^[A-Za-z0-9_]+$/,
      message: "Only alphanumeric and underscore allowed",
    };
  }
  return rules;
};

// Password validation for login/register
export const loginPasswordValidator = (item, t) => {
  const rules = {
    required: {
      value: true,
      message: t ? t("Password is required") : "Password is required",
    },
  };
  if (item?.validation?.minLength) {
    rules.minLength = {
      value: item.validation.minLength,
      message: t
        ? t(`Minimum length is ${item.validation.minLength}`)
        : `Minimum length is ${item.validation.minLength}`,
    };
  }
  if (item?.validation?.maxLength) {
    rules.maxLength = {
      value: item.validation.maxLength,
      message: t
        ? t(`Maximum length is ${item.validation.maxLength}`)
        : `Maximum length is ${item.validation.maxLength}`,
    };
  }
  let pattern = "^";
  if (item?.validation?.specialChar)
    pattern += "(?=.*[!@#$%^&*()_+-=[]{};':\"|,.<>?])";
  if (item?.validation?.number) pattern += "(?=.*[0-9])";
  if (item?.validation?.mixedCase) pattern += "(?=.*[A-Z])";
  pattern += ".*$";
  // Only add pattern rule if any requirement is set
  if (pattern !== "^.*$") {
    try {
      rules.pattern = {
        value: new RegExp(pattern),
        message: t
          ? t("Password does not meet requirements")
          : "Password does not meet requirements",
      };
    } catch (e) {
      // fallback: do not set pattern if regex fails
    }
  }
  return rules;
};

// Password rules for UI display
export const passwordRules = (item) => {
  const rules = [];
  if (item.minLength) rules.push("minLength");
  if (item.specialChar) rules.push("specialChar");
  if (item.number) rules.push("number");
  if (item.mixedCase) {
    rules.push("capital");
    rules.push("lowercase");
  }
  return rules;
};

export const validateAge = (value) => {
  const currentDate = new Date();
  const selectedDate = new Date(value);
  const minAge = 18; // Change this to your desired minimum age
  if (currentDate.getFullYear() - selectedDate.getFullYear() < minAge) {
    return "you_must_be_at_least_18_years_old.";
  }

  return true;
};

export const forgetPasswordValidator = (item, t) => {
  const rules = {
    required: {
      value: true,
      message: t("this_field_is_required"),
    },
  };
  if (item.passwordPolicy.minLength) {
    rules.minLength = {
      value: item.passwordPolicy.minLength,
      message: `${t("min_length_is")} ${item.passwordPolicy.minLength}`,
    };
  }
  if (item.passwordPolicy.spChar) {
    rules.pattern = {
      value: /[!@#$%^&*()_+\-=\[\]{};':"|,.<>?]/,
      message: t("must_contain_at_least_one_special_character"),
    };
  }
  if (item.passwordPolicy.number) {
    rules.patternNumber = {
      value: /[0-9]/,
      message: t("must_contain_at_least_one_number"),
    };
  }
  if (item.passwordPolicy.mixedCase) {
    rules.patternCapital = {
      value: /[A-Z]/,
      message: t("must_contain_at_least_one_capital_letter"),
    };
  }

  return rules;
};
