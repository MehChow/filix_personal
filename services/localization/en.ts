export default {
  login: {
    email_address: "Email Address",
    password: "Password",
    email_placeholder: "Enter Email Address",
    password_placeholder: "Enter Password",
    forget_password: "Forget Password?",
    keep_sign_in: "Keep me signed in",
    confirm: "Confirm",
    logging_in: "Logging in...",
    no_account: "Don't have an account?",
    register: "Register Now!",
  },
  home: {
    scan_title: "Let's start NIR",
    step_one: {
      title: "➀ CONNECT",
      description:
        "After confirming your device is connected to LinkSquareNIR Wi-Fi, tap the Connect button below to initiate the connection between your device and the NIR device.",
      connecting: "Connecting...",
      connected: "NIR DEVICE CONNECTED",
      notConnected: "CONNECT",
    },
    step_two: {
      title: "➁ PRODUCT",
      category_label: "Category",
      product_label: "Product Name",
      please_select: "Please select",
    },
    step_three: {
      title: "➂ SCAN",
      description:
        "Place the NIR scanner on the product and press the button on NIR scanner. Wait until the light of button stop blinking.",
      important_notes: "Important notes:",
      note1: "1. Scanning will last around 1 minute",
      note2:
        "2. Make sure NIR scanner is completely placed on the product when scanning",
    },
    step_four: {
      title: "➃ COMPARE",
      description: "Please confirm the above steps are completed in order.",
      confirm: "Confirm",
    },
  },
  selectOptions: {
    agarwood: "Agarwood",
    nycx_agarwood_a: "AgarwoodPowder_NYCX_A",
    nycx_agarwood_b: "AgarwoodPowder_NYCX_B",
    nycx_agarwood_c: "AgarwoodPowder_NYCX_C",
  },
  comparing: {
    content:
      "Comparing with the standard spectrum fingerprint in the blockchain",
  },
  result: {
    title: "Result",
    product_type: "Product Type",
    product_name: "Product Name",
    similarity: "Similarity",
    back_home: "Back to Homepage",
  },
  errors: {
    email_empty: "Please enter an email address",
    password_empty: "Please enter a password",
    email_invalid: "Invalid email address",
    category_empty: "Please select a category",
    product_empty: "Please select a product",
  },
  alerts: {
    require_login: "Please log in first",
    invalid_cred: "User not exist",
    network_err: "Network error, please try again later",
    session_expired: "Session expired. Please log in again.",
    not_scanned: "Please scan the data first",
    data_corrupted: "Data corrupted. Please scan the data again",
    no_internet: "Please connect to the Internet first",
    not_ls_wifi: "Please connect to the NIR device's LS Wi-Fi first",
    unknown: "Something went wrong, please try again",
    scanned_successfully: "Data scanned successfully!",
  },
};
