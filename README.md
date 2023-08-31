User Type: Regular User

    AUTHENTICATION
    | Endpoint              | HTTP Method | Description                                               |
    |-----------------------|-------------|-----------------------------------------------------------|
    | /api/auth/register    | POST        | Register a new user account.                              |
    | /api/auth/login       | POST        | Authenticate and log in a user.                           |
    | /api/auth/logout      | POST        | Log out the currently authenticated user.                 |

    USER
    | Endpoint              | HTTP Method | Description                                               |
    |-----------------------|-------------|-----------------------------------------------------------|
    | /api/users/me         | GET         | Get the user profile of the currently authenticated user.|
    | /api/users/me         | PATCH       | Update the user profile of the currently authenticated user.|
    | /api/user/assets      | GET         | Retrieve a list of available assets for borrowing. (includes filtering)|
    | /api/user/assets/:id  | GET         | Get details of a specific asset by its ID. (only for available assets)|
    | /api/user/borrow      | POST        | Borrow an asset by specifying the asset ID and duration. |
    | /api/user/borrow      | GET         | Get all borrow transactions history of currently authenticated user|
    | /api/user/return      | POST        | Mark a borrowed asset as returned.                       |

User Type: Admin

    ADMIN
    | Endpoint              | HTTP Method | Description                                               |
    |-----------------------|-------------|-----------------------------------------------------------|
    | /api/admin/assets     | GET         | Retrieve a list of all assets.(includes filtering)        |
    | /api/admin/assets/:id | GET         | Retrieve a list of all assets.(includes filtering)        |
    | /api/admin/assets/    | POST        | Creating a new asset                                      |
    | /api/admin/assets/:id | PATCH       | Update details of a specific asset by its ID.             |
    | /api/admin/assets/:id | DELETE      | Delete a specific asset by its ID.                        |
    | /api/admin/borrow     | GET         | Retrieve a list of all borrowed assets  (//TODO: includes query params)
    | /api/admin/borrow/:id | GET         | Get details of a specific borrowed asset by its ID.       |
    | /api/admin/borrow/:id | PATCH       | Update details of a specific borrowed asset by its ID.  |
    | /api/admin/borrow/:id | DELETE      | Delete a specific borrowed asset by its ID.               |

Query Params
/api/users/assets?name=<name>&description=<description>
/api/admin/assets?name=<name>&description=<description>&availability=<availablity>

Transaction Collection:

```
[
    {
    "_id": "transaction1",
    "user": "user1",
    "asset": "asset2",
    "borrowedAt": "2023-06-12T10:00:00Z",
    "dueAt": "2023-09-15T00:00:00Z",
    "returnedAt": null,
    "status" : "borrow"
    },
    {
    "_id": "transaction1",
    "user": "user1",
    "asset": "asset2",
    "borrowedAt": "2023-06-12T10:00:00Z",
    "dueAt": "2023-09-15T00:00:00Z",
    "returnedAt": "2023-06-13T12:00:00Z",
    "status" : "returned"
    },
    {    "
    _id": "transaction2",
    "user": "user1",
    "asset": "asset3",
    "borrowedAt": "2023-06-10T14:00:00Z",
    "dueAt": "2023-05-25T00:00:00Z",
    "returnedAt": "2023-06-12T16:00:00Z" ,
    "status" : "returned late"
    }
]
```
