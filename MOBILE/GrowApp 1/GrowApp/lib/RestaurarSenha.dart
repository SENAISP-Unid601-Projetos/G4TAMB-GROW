import 'package:flutter/material.dart';
import 'package:grow/login.dart';

void main() {
  runApp(const RestaurarSenha());
}

class RestaurarSenha extends StatelessWidget {
  const RestaurarSenha({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Recuperar Senha',
      theme: ThemeData(
        primarySwatch: Colors.green,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const RecuperarSenhaPage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class RecuperarSenhaPage extends StatelessWidget {
  const RecuperarSenhaPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFE7E7E7),
      body: Center(
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              child: Container(
                padding: const EdgeInsets.all(16.0),
                width: constraints.maxWidth > 600 ? 600 : constraints.maxWidth * 0.9,
                decoration: BoxDecoration(
                  color: Colors.white,
                  boxShadow: const [
                    BoxShadow(
                      color: Colors.black26,
                      blurRadius: 10,
                      spreadRadius: 2,
                    ),
                  ],
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  children: [
                    if (constraints.maxWidth > 600)
                      Image.asset(
                        'assets/senha.png',
                        height: 150,
                      ),
                    const SizedBox(height: 20),
                    Align(
                      alignment: Alignment.topRight,
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (context) => const Login(),
                            ),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF326D58),
                        ),
                        child: const Text('Voltar', style: TextStyle(color: Colors.white),),
                      ),
                    ),
                    const SizedBox(height: 20),
                    const Text(
                      'Esqueceu a Senha?',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                    const SizedBox(height: 20),
                    TextField(
                      decoration: InputDecoration(
                        labelText: 'E-mail para recuperação de Senha',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    const Text(
                      'Um link para a redefinição da senha será enviado para o endereço de E-mail inserido.',
                      style: TextStyle(fontSize: 12),
                    ),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () {
                        // Lógica para enviar o e-mail
                      },
                      style: ElevatedButton.styleFrom(
                        foregroundColor: const Color(0xFF326D58), backgroundColor: Colors.transparent,
                        side: const BorderSide(color: Color(0xFF326D58)),
                      ),
                      child: const Text('Enviar'),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Login'),
      ),
      body: const Center(
        child: Text('Página de Login'),
      ),
    );
  }
}
