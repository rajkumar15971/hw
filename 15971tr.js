
if (window.openDatabase) {
    var mydb = openDatabase("users_db", "0.1", "User openDatabase", 2 * 1024 * 1024);

        mydb.transaction(function (t) {
//t.executeSql("DROP TABLE IF EXISTS users");});

        t.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY ASC, FirstName TEXT, LastName TEXT)");
    });



} else {
    alert("WebSQL is not supported by your browser!");
}

function updateuserList(transaction, results) {
    var listitems = "";
    var listholder = document.getElementById("userlist");
    listholder.innerHTML = "";

    var i;    for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);

        listholder.innerHTML += "<tr><td> User Input ID </td><td>:</td><td>" + row.id +"</td><td><button onclick='deleteuser(" + row.id + ");'>Delete user</button></td></tr>" + "<tr><td> Color </td><td>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + row.FirstName + "<tr><td> Input Number is  </td><td>:</td><td>" + row.LastName + "</td></tr><tr><td>";
    }

}

function outputusers() {
    if (mydb) {
         mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM users", [], updateuserList);
        });
    } else {
        alert("Database not found, I'm Sorry! Your browser doesn't support WebSQL!");
    }
}



function adduser() {
        if (mydb) {
        var fname,lname;
fname=document.getElementById("fname").value;
//alert(fname);
lname=document.getElementById("lname").value;
if (fname !== "" && lname !== "") {
            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO users (FirstName, LastName) VALUES (?, ?)", [fname,lname]);
                outputusers();
            });
        } else {
            //alert("You must enter a fname and lname!");
        }
    } else {
        alert("Database not found, I'm Sorry! Your browser doesn't support WebSQL!");
    }
}



function deleteuser(id) {
        if (mydb) {
        
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM users WHERE id=?", [id], outputusers);
        });
    } else {
        alert("Database not found, I'm Sorry! Your browser doesn't support WebSQL!");
    }
}

outputusers();
