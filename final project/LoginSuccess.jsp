<%-- 
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" import="test.UserBean"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<%
UserBean ub=(UserBean)application.getAttribute("ubean");
out.println("Welcome User: "+ub.getfName()+"<br>");
%>
<a href="view">ViewProfile</a>
<a>Logout</a>
</body>
</html>
--%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" import="test.UserBean" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="ISO-8859-1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <!-- Bootstrap CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
            padding-top: 50px; /* Adjust based on your needs */
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }
        .welcome-msg {
            font-size: 24px;
            margin-bottom: 20px;
        }
        .logout-link {
            margin-top: 20px;
            display: inline-block;
            margin-right: 10px;
        }
        .view-profile-link {
            margin-top: 20px;
            display: inline-block;
            margin-left: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="welcome-msg">
            <% 
            UserBean ub = (UserBean) application.getAttribute("ubean");
            out.println("Welcome User: " + ub.getfName() + "<br>");
            %>
        </div>
        <a href="view" class="btn btn-primary view-profile-link">Start Game</a>        
        <a href="#" class="btn btn-secondary logout-link">Logout</a>
    </div>

    <!-- Bootstrap JS and dependencies (not required for this page but for completeness) -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
