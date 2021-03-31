import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ui/components/CustomAlertDialog.dart';
import 'package:ui/models/LoginResponse.dart';
import 'package:ui/helpers/constants.dart';

class FormLogin extends StatefulWidget {
  @override
  FormLoginState createState() {
    return FormLoginState();
  }
}

requestLogin(String username, String password, BuildContext context) async {
  final response = await http.post(Uri.https(appUri, loginEndpoint), body: jsonEncode({
    'username': username,
    'password': password,
  }));
  final responseBody = loginResponseFromJson(response.body);

  if (response.statusCode == 200) {
    return true;
  } else {
    customAlertDialog(context, responseBody.message);
    return false;
  }
}

class FormLoginState extends State<FormLogin> {

  final formLoginKey = GlobalKey<FormState>();

  TextEditingController usernameInputController = TextEditingController();
  TextEditingController passwordInputController = TextEditingController();

  String validateRequiredInputs(inputName, value) {
    return (value == null || value.isEmpty) ? inputName + ' is required.' : null;
  }

  loginButtonClick() async {
    if (formLoginKey.currentState.validate()) {
      bool loginSuccessful = await requestLogin(usernameInputController.text, passwordInputController.text, context);
      if (loginSuccessful) {
        // change pages
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: formLoginKey,
      child: Column(
        children: [
          TextFormField(
            decoration: InputDecoration(
              hintText: 'username',
            ),
            validator: (value) => validateRequiredInputs('Username', value),
            controller: usernameInputController,
          ),
          TextFormField(
            decoration: InputDecoration(
              hintText: 'password',
            ),
            validator: (value) => validateRequiredInputs('Password', value),
            controller: passwordInputController,
            obscureText: true,
          ),
          ElevatedButton(
            onPressed: loginButtonClick,
            child: Text('Login')
          ),
        ],
      ),
    );
  }
}
