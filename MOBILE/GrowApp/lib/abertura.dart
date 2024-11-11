import 'package:flutter/material.dart';
import 'dart:async';

import 'package:grow/main.dart';  // Para temporizar a transição

void main() => runApp(abertura());

class abertura extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GROW App',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: SplashScreen(), // Primeira página a ser exibida
      debugShowCheckedModeBanner: false,
    );
  }
}

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {

  @override
  void initState() {
    super.initState();
     
     Timer(Duration(seconds: 3), () {
       Navigator.of(context).pushReplacement(
         MaterialPageRoute(builder: (_) => MyApp())
       );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,  // Alterado para fundo branco
      body: Center(
        child: Image.asset(
          'assets/logo.gif', // Caminho para o gif da logo
          width: 200.0,      // Ajuste o tamanho conforme necessário
          height: 200.0,
        ),
      ),
    );
  }
}

// class LoginPage extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Cadastrar ou Entrar'),
//       ),
//       body: Center(
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: <Widget>[
//             ElevatedButton(
//               onPressed: () {
//                 // Ação para cadastrar
//               },
//               child: Text('Cadastrar'),
//             ),
//             ElevatedButton(
//               onPressed: () {
//                 // Ação para entrar
//               },
//               child: Text('Entrar'),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }