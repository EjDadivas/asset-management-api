REGISTRATION
{
"username": "johnDoe",
"password": "password123",
"email": "johndoe@example.com",
"role": "regular"
}
{
"username": "janeSmith",
"password": "password456",
"email": "janesmith@example.com",
"role": "regular"
}
{
"username": "adminUser",
"password": "adminPassword",
"email": "adminuser@example.com",
"role": "admin"
}

LOGIN
{
"email": "johndoe@example.com",
"password": "password123"
}
{
"email": "janesmith@example.com",
"password": "password456"
}
{
"email": "adminuser@example.com",
"password": "adminPassword"
}

ASSET
{
"name": "Laptop",
"description": "MacBook Pro",
"availability": true
},
{
"name": "Projector",
"description": "Epson PowerLite",
"availability": false
},
{
"name": "Camera",
"description": "Canon EOS",
"availability": true
}

Transaction:
{
"asset": "asset_id_here",  
"dueAt": "2023-09-15T00:00:00Z"
}
{
"asset": "asset_id_here",
"dueAt": "2023-09-20T00:00:00Z"
}

//OverDue Transaction Dates:
{
"asset": "asset_id_here",
"dueAt": "2023-05-25T00:00:00Z"
}
{
"asset": "asset_id_here",
"dueAt": "2023-07-30T00:00:00Z"
}
