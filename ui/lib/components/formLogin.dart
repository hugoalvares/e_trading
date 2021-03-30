import 'package:flutter/material.dart';

class FormLogin extends StatefulWidget {
  @override
  FormLoginState createState() {
    return FormLoginState();
  }
}

class FormLoginState extends State<FormLogin> {

  final _formKey = GlobalKey<FormState>();

  String _validateRequiredInputs(inputName, value) {
    return (value == null || value.isEmpty) ? inputName + ' is required.' : '';
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            decoration: InputDecoration(
              hintText: 'username',
            ),
            validator: (value) => _validateRequiredInputs('Username', value),
          ),
          TextFormField(
            decoration: InputDecoration(
              hintText: 'password',
            ),
            validator: (value) => _validateRequiredInputs('Password', value),
            obscureText: true,
          ),
          ElevatedButton(
            onPressed: () {
              return _formKey.currentState.validate();
            },
            child: Text('Login')
          ),
        ],
      ),
    );
  }
}
