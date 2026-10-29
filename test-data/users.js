
export const users = {
  standard: {
    username: process.env.STANDARD_USERNAME || 'standard_user',
  },
  lockedOut: {
    username: process.env.LOCKED_OUT_USERNAME || 'locked_out_user',
  },
};

export const password = process.env.TEST_PASSWORD || 'secret_sauce';
