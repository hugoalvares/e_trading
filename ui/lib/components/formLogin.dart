import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ui/components/CustomAlertDialog.dart';
import 'package:ui/components/UserPosition.dart';
import 'package:ui/models/LoginResponse.dart';
import 'package:ui/models/PositionResponse.dart';
import 'package:ui/helpers/constants.dart';

class FormLogin extends StatefulWidget {
  @override
  FormLoginState createState() {
    return FormLoginState();
  }
}

class FormLoginState extends State<FormLogin> {

  final formLoginKey = GlobalKey<FormState>();

  TextEditingController usernameInputController = TextEditingController();
  TextEditingController passwordInputController = TextEditingController();

  validateRequiredInputs(inputName, value) {
    return (value == null || value.isEmpty) ? inputName + ' is required.' : null;
  }

  requestLogin(String username, String password) async {
    final response = await http.post(Uri.https(loginUri, loginEndpoint), body: jsonEncode({
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

  requestUserPosition(String username) async {
    final response = await http.post(Uri.https(positionUri, positionEndpoint), body: jsonEncode({
      'username': username,
    }));
    final responseBody = positionResponseFromJson(response.body);

    if (response.statusCode == 200) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => UserPosition(), 
          settings: RouteSettings(
            arguments: responseBody,
          )
        ),
      );
    } else {
      customAlertDialog(context, responseBody.message);
    }
  }

  loginButtonClick() async {
    if (formLoginKey.currentState.validate()) {
      bool loginSuccessful = await requestLogin(usernameInputController.text, passwordInputController.text);
      if (loginSuccessful) {
        await requestUserPosition(usernameInputController.text);
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
