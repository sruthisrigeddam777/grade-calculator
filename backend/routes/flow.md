- post(authenticate_user.php)->req.body(token,idno,password)&cookie(phpsesid)===>response(0|1)
- post(get_result.php)->req.body(idno,token)&cookie(phpsesid)===>response(sem results)

- we need to find a way of gettig token and php sesid
- do they accept arbitrary values given by user

- post(authenticate_user.php)->req.body(token,idno,password)&cookie(phpsesid)===>response(0|1)
- post(get_result.php)->req.body(idno,token)&cookie(phpsesid)===>response(sem results)
