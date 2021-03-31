import 'package:flutter/material.dart';
import 'package:ui/components/FormLogin.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome'),
          centerTitle: true,
        ),
        body: Center(
          child: FormLogin(),
        ),
      ),
    );
  }
}
