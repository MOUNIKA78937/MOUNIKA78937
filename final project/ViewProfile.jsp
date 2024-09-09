
<%--<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" import="test.UserBean"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<%
String fName=(String)request.getAttribute("fname");
UserBean ub=(UserBean)application.getAttribute("ubean");
out.println(ub.getfName()+"&nbsp&nbsp"+ub.getlName()+"&nbsp&nbsp"+ub.getAddr()+"&nbsp&nbsp"+
ub.getmId()+"&nbsp&nbsp"+ub.getPhNo()+"&nbsp&nbsp"+"<a href='edit'>Edit</a><br>");
%>
<a href="logout">Logout</a>
</body>
</html>
--%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" import="test.UserBean"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sliding Puzzle</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h1 class="text-center mt-5">Sliding Puzzle</h1>
        <div id="theme-selection" class="text-center mt-4">
            <h2>Select a Theme</h2>
            <button class="btn btn-primary m-2" onclick="selectFolder('freedom-fighters')">Freedom Fighters</button>
            <button class="btn btn-primary m-2" onclick="selectFolder('national-leaders')">National Leaders</button>
            <button class="btn btn-primary m-2" onclick="selectFolder('monuments')">Monuments</button>
            <button class="btn btn-primary m-2" onclick="selectFolder('scientists')">Scientists</button>
            <button class="btn btn-primary m-2" onclick="selectFolder('science')">Science</button>
        </div>
        <div id="folder-selection" class="text-center mt-4 d-none">
            <h2>Select a puzzle</h2>
            <div id="folder-buttons"></div>
        </div>
        <div id="puzzle-container" class="mt-5 d-none">
            <button class="btn btn-secondary mb-3" onclick="exitToThemes()">Exit</button>
            <div id="board" class="d-flex flex-wrap"></div>
            <div id="result" class="mt-4 text-center"></div>
            <div>Turns: <span id="turns">0</span></div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>



