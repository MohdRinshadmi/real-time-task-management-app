interface ValidationRule {
  value: boolean | number | RegExp;
  message: string;
}

interface ValidationRules {
  required?: ValidationRule;
  minLength?: ValidationRule;
  maxLength?: ValidationRule;
  pattern?: ValidationRule;
  patternNumber?: ValidationRule;
  patternCapital?: ValidationRule;
}

interface ValidationConfig {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  specialChar?: boolean;
  number?: boolean;
  mixedCase?: boolean;
}

interface PasswordPolicy {
  minLength?: number;
  spChar?: boolean;
  number?: boolean;
  mixedCase?: boolean;
}

interface ValidatedItem {
  type?: string;
  validation?: ValidationConfig;
  minLength?: boolean;
  specialChar?: boolean;
  number?: boolean;
  mixedCase?: boolean;
  passwordPolicy?: PasswordPolicy;
}

// Username validation for login/register
export const loginUsernameValidator = (item: ValidatedItem): ValidationRules => {
  const rules: ValidationRules = {
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
export const loginPasswordValidator = (item: ValidatedItem, t?: (key: string) => string): ValidationRules => {
  const rules: ValidationRules = {
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
export const passwordRules = (item: ValidatedItem): string[] => {
  const rules: string[] = [];
  if (item.minLength) rules.push("minLength");
  if (item.specialChar) rules.push("specialChar");
  if (item.number) rules.push("number");
  if (item.mixedCase) {
    rules.push("capital");
    rules.push("lowercase");
  }
  return rules;
};

export const validateAge = (value: string | number | Date): string | boolean => {
  const currentDate = new Date();
  const selectedDate = new Date(value);
  const minAge = 18; // Change this to your desired minimum age
  if (currentDate.getFullYear() - selectedDate.getFullYear() < minAge) {
    return "you_must_be_at_least_18_years_old.";
  }

  return true;
};

export const forgetPasswordValidator = (item: ValidatedItem, t: (key: string) => string): ValidationRules => {
  const rules: ValidationRules = {
    required: {
      value: true,
      message: t("this_field_is_required"),
    },
  };
  if (item.passwordPolicy?.minLength) {
    rules.minLength = {
      value: item.passwordPolicy.minLength,
      message: `${t("min_length_is")} ${item.passwordPolicy.minLength}`,
    };
  }
  if (item.passwordPolicy?.spChar) {
    rules.pattern = {
      value: /[!@#$%^&*()_+\-=\[\]{};':"|,.<>?]/,
      message: t("must_contain_at_least_one_special_character"),
    };
  }
  if (item.passwordPolicy?.number) {
    rules.patternNumber = {
      value: /[0-9]/,
      message: t("must_contain_at_least_one_number"),
    };
  }
  if (item.passwordPolicy?.mixedCase) {
    rules.patternCapital = {
      value: /[A-Z]/,
      message: t("must_contain_at_least_one_capital_letter"),
    };
  }

  return rules;
};
