export default {
  translation: {
    UI: {
      PAGES: {
        DASHBOARD: {
          HOME: "Dashboard"
        },
        //
        PRODUCTS: {
          HOME: "Products",
          ADD: "New Product",
          EDIT: "Edit Product",
          SCALES: {
            HOME: "Scales",
            ADD: "New Scale",
            EDIT: "Edit Scale"
          },
          TYPES: {
            HOME: "Types",
            ADD: "New Type",
            EDIT: "Edit Type"
          },
          MAKERS: {
            HOME: "Makers",
            ADD: "New Maker",
            EDIT: "Edit Maker"
          },
          BRANDS: {
            HOME: "Brands",
            ADD: "New Brand",
            EDIT: "Edit Brand"
          },
          ATTRIBUTES: {
            HOME: "Attributes",
            ADD: "New Attribute",
            EDIT: "Edit Attribute"
          }
        },
        INVENTORY: {
          HOME: "Inventory",
          ADD: "Import",
          ADDBASIC: "Quick Import",
          EDIT: "Edit Imported Item"
        },
        PROMOTIONS: {
          HOME: "Promotions",
          ADD: "New Promotion",
          EDIT: "Edit Promotion"
        },
        SHOP: {
          HOME: "Shop Info"
        },
        REPORTS: {
          HOME: "Reports"
        },
        //
        ORDERS: {
          HOME: "Orders",
          INSPECT: "Inspect Order",
          VERIFY: "Verify Order"
        },
        SUPPORT: {
          HOME: "Customer Support",
          EDIT: "Edit Support Ticket"
        },
        //
        ADMIN: {
          HOME: "Administration",
          STAFF: {
            HOME: "Staff",
            ADD: "Add Staff"
          },
          USERS: {
            HOME: "Users"
          }
        },
        //
        SEARCH: {
          HOME: "Search Results"
        }
      },
      LAYOUT: {
        PROFILE: {
          VIEWPROFILE: "View Profile",
          LOGOUT: "Log Out"
        }
      },
      FORM: {
        BROWSE: "Browse",
        IMPORT: "Import",
        SELECT_ONE: "Select one",
        SELECT_MULTIPLE: "Select multiple",
        SELECT_USER: "User",
        SELECT_STAFF: "Staff",
        SELECT_MERCHANDISER: "Merchandiser",
        SELECT_SUPPORT: "Customer Support",
        SELECT_PRODUCT: "Product",
        SELECT_INVENTORY: "Inventory item",
        COLORS: "Colors (HEX)",
        PREVIEW: "Preview",
        VALUE: "Value",
        RATING: "Rating"
      }
    },
    MODELLING: {
      COMMON: {
        QUERY: "Search",
        YES: "Yes",
        NO: "No",
        ALL: "All",
        NONE: "None",
        PENDING: "Pending",
        CREATEDAT: "Created at",
        UPDATEDAT: "Updated at",
        ID: "ID",
        NAME: "Name",
        LASTNAME: "Last name",
        FIRSTNAME: "First name",
        USERNAME: "Username",
        EMAIL: "Email",
        PHONE: "Phone number",
        ADDRESS: "Address",
        STAFFID: "Staff ID",
        USERID: "User ID",
        ROLE: "Role"
      },
      DATATYPES: {
        MSG: {
          REQUIRED: "Required."
        }
      }
    },
    FORM: {
      COMMON: {
        SUCCESS: "Success!",
        LOADING: "Loading...",
        SUBMIT: "Submit",
        CONFIRM: "Confirm",
        CANCEL: "Cancel",
        CLEAR: "Clear",
        UNDONE: "This action cannot be undone."
      }
    },
    //
    AUTH: {
      MODEL: {
        USERNAME: {
          LABEL: "Username"
        },
        PASSWORD: {
          LABEL: "Password"
        }
      },
      LABEL: {
        LOGIN: "Login",
        STAYSIGNEDIN: "Stay signed in"
      }
    },
    DASHBOARD: {
      HOME: {
        WELCOMEMSG: "Welcome to Tempest"
      }
    },
    PRODUCTS: {
      MODEL: {
        NAME: {
          LABEL: "Product Name"
        },
        ID: {
          LABEL: "Product ID"
        },
        SCALE: {
          LABEL: "Scale"
        },
        TYPE: {
          LABEL: "Type"
        },
        MAKER: {
          LABEL: "Maker"
        },
        BRAND: {
          LABEL: "Brand"
        },
        YEAR: {
          LABEL: "Year",
          DATATYPES: {
            MSG: "Must be a number (1970 or higher)."
          }
        },
        PRICE: {
          LABEL: "Price",
          DATATYPES: {
            MSG: "Must be a number (1 or higher)."
          }
        },
        HIDDEN: {
          LABEL: "Hidden from Display"
        },
        IMAGES: {
          LABEL: "Images",
          DATATYPES: {
            MSG: "At least 1 image is required."
          }
        },
        VARIATIONS: {
          LABEL: "Variations"
        },
        ATTRIBUTES: {
          LABEL: "Attributes"
        },
        BLOG: {
          LABEL: "Detail (Description)"
        },
        VARIATIONNAME: {
          LABEL: "Variation Name"
        }
      },
      LABEL: {
        BACK: "Go to Product list",
        IMAGE: "Image",
        CREATEDAT: "Created at",
        HIDDEN: "Visibility",
        VIEW_SCALES: "View Scales",
        VIEW_TYPES: "View Types",
        VIEW_MAKERS: "View Makers",
        VIEW_BRANDS: "View Brands",
        VIEW_ATTRIBUTES: "View Attributes",
        HIDDEN_TRUE: "Hidden",
        HIDDEN_FALSE: "Visible",
        QUANTITIES: "Quantity"
      },
      DIALOG: {
        DELETE0: "Deleting Product",
        DELETE1: "Are you sure wanted to delete this product?",
        DELETE2: "WARNING: Any related items of this Product will be deleted",
        HIDE0: "Hiding Product",
        HIDE1: "Are you sure wanted to hide this product?",
        UNHIDE0: "Unhiding Product",
        UNHIDE1: "Are you sure wanted to unhide this product?"
      }
    },
    SCALES: {
      MODEL: {
        ID: {
          LABEL: "ID"
        },
        NAME: {
          LABEL: "Name"
        },
        DESCRIPTION: {
          LABEL: "Description"
        }
      },
      LABEL: {
        BACK: "Go to Scale list",
        PLACING: "Placing"
      },
      DIALOG: {
        DELETE0: "Deleting Scale",
        DELETE1: "Are you sure wanted to delete this scale?",
        DELETE2: "WARNING: Any related items of this Scale will be deleted"
      }
    },
    TYPES: {
      MODEL: {
        ID: {
          LABEL: "ID"
        },
        NAME: {
          LABEL: "Name"
        },
        DESCRIPTION: {
          LABEL: "Description"
        }
      },
      LABEL: {
        BACK: "Go to Type list",
        PLACING: "Placing"
      },
      DIALOG: {
        DELETE0: "Deleting Type",
        DELETE1: "Are you sure wanted to delete this type?",
        DELETE2: "WARNING: Any related items of this Type will be deleted"
      }
    },
    MAKERS: {
      MODEL: {
        ID: {
          LABEL: "ID"
        },
        NAME: {
          LABEL: "Name"
        },
        DESCRIPTION: {
          LABEL: "Description"
        }
      },
      LABEL: {
        BACK: "Go to Maker list",
        PLACING: "Placing"
      },
      DIALOG: {
        DELETE0: "Deleting Maker",
        DELETE1: "Are you sure wanted to delete this maker?",
        DELETE2: "WARNING: Any related items of this Maker will be deleted"
      }
    },
    BRANDS: {
      MODEL: {
        ID: {
          LABEL: "ID"
        },
        NAME: {
          LABEL: "Name"
        },
        DESCRIPTION: {
          LABEL: "Description"
        }
      },
      LABEL: {
        BACK: "Go to Brand list",
        PLACING: "Placing"
      },
      DIALOG: {
        DELETE0: "Deleting Brand",
        DELETE1: "Are you sure wanted to delete this brand?",
        DELETE2: "WARNING: Any related items of this Brand will be deleted"
      }
    },
    ATTRIBUTES: {
      MODEL: {
        ID: {
          LABEL: "ID"
        },
        NAME: {
          LABEL: "Name"
        },
        VALUETYPE: {
          LABEL: "Value Type",
          SELECTIONS: {
            STATIC: "Static",
            DYNAMIC: "Dynamic"
          }
        },
        DESCRIPTION: {
          LABEL: "Description"
        }
      },
      LABEL: {
        BACK: "Go to Attribute list",
        PLACING: "Placing"
      },
      DIALOG: {
        DELETE0: "Deleting Attribute",
        DELETE1: "Are you sure wanted to delete this attribute?",
        DELETE2: "WARNING: Any related items of this Attribute will be deleted"
      }
    },
    INVENTORY: {
      MODEL: {
        ID: {
          LABEL: "Serial Number"
        },
        ITEMID: {
          LABEL: "Product"
        },
        VARIATIONID: {
          LABEL: "Variation"
        },
        AVAILABLE: {
          LABEL: "Availability"
        },
        INVENTORIES: {
          LABEL: "Inventory Import Spreadsheet",
          DATATYPES: {
            MSG0: "Spreadsheet with data is required.",
            MSG1: "All rows must have only 3 columns."
          }
        },
        IDENTIFIERS: {
          LABEL: "Serial Numbers (1 per line)"
        }
      },
      LABEL: {
        BACK: "Go to Inventory",
        BOUGHT: "Is Purchased",
        CREATEDAT: "Imported at",
        VARIATIONID: "Variation ID",
        VARIATIONNAME: "Variation Name"
      },
      TEXT: {
        LIST: {
          TXT0: "Bought item cannot be edited"
        },
        ADD: {
          TXT0: "Start importing items into inventory by importing an",
          TXT1: " Excel spreadsheet (.xlsx) ",
          TXT2: "containing:",
          TXT3: "First row: Header (3 columns)",
          TXT4: "Remaining rows:",
          TXT5: "Column 1: Serial Number",
          TXT6: "Column 2: Product Name",
          TXT7: "Column 3: Variation Name"
        }
      }
    },
    PROMOTIONS: {
      MODEL: {
        ID: {
          LABEL: "ID"
        },
        NAME: {
          LABEL: "Name"
        },
        TIMESTART: {
          LABEL: "Start Time"
        },
        TIMEEND: {
          LABEL: "End Time"
        },
        OFFPERCENT: {
          LABEL: "Sale-Off %",
          DATATYPES: {
            MSG: "Must be a number between 1 and 100."
          }
        },
        DESCRIPTION: {
          LABEL: "Description"
        },
        ITEMS: {
          LABEL: "Applied Items",
          DATATYPES: {
            MSG: "At least 1 item is required."
          }
        }
      },
      LABEL: {
        BACK: "Go to Promotion list"
      },
      DIALOG: {
        DELETE0: "Deleting Promotion",
        DELETE1: "Are you sure wanted to delete this promotion?",
        DELETE2: "WARNING: Any related items of this Promotion will be deleted"
      }
    },
    SHOP: {
      MODEL: {
        NAME: {
          LABEL: "Name"
        },
        LOCATIONLNG: {
          LABEL: "Location Longitude"
        },
        LOCATIONLAT: {
          LABEL: "Location Latitude"
        },
        ADDRESS: {
          LABEL: "Address"
        },
        PHONE: {
          LABEL: "Phone"
        },
        DESCRIPTION: {
          LABEL: "Description"
        }
      }
    },
    REPORTS: {
      MODEL: {
        YEAR: {
          LABEL: "Year"
        },
        CATEGORY: {
          LABEL: "Category",
          SELECTIONS: {
            TYPE: "Type",
            SCALE: "Scale",
            MAKER: "Maker",
            BRAND: "Brand"
          }
        },
        TIMESTART: {
          LABEL: "Start Time"
        },
        TIMEEND: {
          LABEL: "End Time"
        }
      },
      LABEL: {
        REPORTMONTHLY: "Monthly Sales",
        REPORTPRODUCT: "Sales by Product",
        REPORTCATEGORY: "Sales by Category",
        SALES: "Sales",
        QUANTITY: "Quantity"
      }
    },
    //
    ORDERS: {
      MODEL: {
        ID: {
          LABEL: "Order ID"
        },
        LASTNAME: {
          LABEL: "Last Name"
        },
        FIRSTNAME: {
          LABEL: "First Name"
        },
        EMAIL: {
          LABEL: "Email",
          DATATYPES: {
            MSG: "Must follow the format of an email. eg. helloworld@domain.com"
          }
        },
        PHONE: {
          LABEL: "Phone"
        },
        ADDRESS: {
          LABEL: "Delivery Address"
        },
        ITEMID: {
          LABEL: "Product"
        },
        VARIATIONID: {
          LABEL: "Variation"
        },
        ORDERDETAILS: {
          LABEL: "Order Details"
        },
        VERIFY: {
          LABEL: "Proceed with action...",
          SELECTIONS: {
            TRUE: "Verify this order",
            FALSE: "Cancel this order"
          }
        },
        USERID: {
          LABEL: "Customer"
        },
        VERIFIER: {
          LABEL: "Order Verifier"
        },
        STATUSID: {
          LABEL: "Status"
        }
      },
      LABEL: {
        BACK: "Go to Order List",
        VERIFY: "Verify",
        STARTDELIVERY: "Start Delivery",
        COMPLETE: "Complete",
        CANCEL: "Cancel",
        INFORMATION: "Information",
        CUSTOMERID: "Customer ID",
        TOTALPAYMENT: "Total Payment",
        APPLIEDPROMOTION: "Applied Promotion ID",
        PAYEE: "Payee",
        PAYEE_NAME: "Name",
        PAYEE_EMAIL: "Email",
        PAYEE_PHONE: "Phone",
        PAYEE_ADDRESS: "Delivery Address",
        DETAILS: "Details",
        ITEM_ID: "Item ID",
        ITEM_VARIATIONID: "Variation ID",
        ITEM_NAME: "Item Name",
        ITEM_PRICE: "Unit Price",
        ITEM_INVENTORYID: "Selected Inventory Item",
        PAYMENTTRACKING: "Payment Tracking",
        ORDERPAYMENTID: "Payment ID",
        PAYMENTMETHOD: "Payment Method",
        PAYMENTAMOUNT: "Amount",
        ISPAID: "Is Paid",
        MODIFY: "Actions"
      },
      TEXT: {
        VIEW: {
          TXT0: "Order must be created through storefront's website"
        }
      },
      DIALOG: {
        CANCEL0: "Cancel Order",
        CANCEL1: "Are you sure wanted to cancel this order?",
        COMPLETE0: "Complete Order",
        COMPLETE1: "Are you sure wanted to complete this order?",
        STARTDELIVERY0: "Start delivery for order",
        STARTDELIVERY1: "Are you sure wanted to start delivery for this order?"
      }
    },
    //
    SUPPORT: {
      MODEL: {
        ID: {
          LABEL: "ID"
        },
        SUPPORTTYPEID: {
          LABEL: "Support Type"
        },
        CUSTOMER: {
          LABEL: "Customer"
        },
        SUPPORT: {
          LABEL: "Support Staff"
        },
        STATUSID: {
          LABEL: "Status"
        },
        ORDERID: {
          LABEL: "Order ID"
        },
        NOTE: {
          LABEL: "Note from Customer"
        }
      },
      LABEL: {
        BACK: "Go to Support Ticket list",
        UPDATESTATUS: "Update Status",
        CUSTOMERINFO: "Customer Info",
        DETAILS: "Details",
        ATTACHEDORDERID: "Attached Order ID",
        ADDSUPPORTTICKET: "Add Support Ticket"
      },
      TEXT: {
        VIEW: {
          TXT0: "Support Tickets must be submitted by customers"
        }
      },
      DIALOG: {
        DELETE0: "Deleting Support Ticket",
        DELETE1: "Are you sure wanted to delete this support ticket?",
        DELETE2: "WARNING: Any related items of this Support Ticket will be deleted"
      }
    }
  }
};
