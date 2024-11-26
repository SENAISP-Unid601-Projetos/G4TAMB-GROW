import 'package:flutter/material.dart';
import 'package:grow/RestaurarSenha.dart';
import 'package:grow/cadastro.dart';
import 'package:grow/main.dart';

void main() => runApp(const Login());

class Login extends StatelessWidget {
  const Login({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tela de Login',
      theme: ThemeData(
        brightness: Brightness.light,
        primarySwatch: Colors.green,
        primaryColor: const Color(0xFF0F5913),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF326D58),
        ),
        inputDecorationTheme: InputDecorationTheme(
          labelStyle: const TextStyle(color: Colors.black54),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          prefixIconColor: Colors.black54,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            foregroundColor: Colors.white,
            backgroundColor: const Color(0xFF326D58),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            minimumSize: const Size(double.infinity, 48),
          ),
        ),
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            foregroundColor: const Color(0xFF275B0E),
          ),
        ),
      ),
      home: const LoginScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _rememberMe = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _login() {
    if (_formKey.currentState?.validate() ?? false) {
      // Handle login action
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      resizeToAvoidBottomInset: true, // Isso garante que a tela se ajuste quando o teclado aparecer
      body: SingleChildScrollView(
        child: SizedBox(
          height: screenHeight, // Define a altura total da tela para o ScrollView
          child: Stack(
            children: [
              // Imagem no topo
              Positioned(
                top: 0,
                left: 0,
                right: 0,
                child: FractionallySizedBox(
                  widthFactor: 1.0,
                  child: Container(
                    height: screenHeight * 0.4, // Aumentando a altura da imagem para 40% da altura da tela
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: FittedBox(
                      fit: BoxFit.contain, // Garantir que a imagem se ajuste sem cortar
                      child: Image.asset(
                        'assets/imagemLogin.jpg', // Caminho para a sua imagem
                      ),
                    ),
                  ),
                ),
              ),
              Positioned(
                top: screenHeight * 0.4 + 16, // Ajuste para começar abaixo da imagem com uma margem
                left: 0,
                right: 0,
                child: Center(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          // Ícones sociais
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              IconButton(
                                icon: const Icon(Icons.facebook, size: 40, color: Colors.blue),
                                onPressed: () {
                                  // Handle Facebook login
                                },
                              ),
                              const SizedBox(width: 20),
                              IconButton(
                                icon: const Icon(Icons.g_mobiledata, size: 40, color: Colors.red),
                                onPressed: () {
                                  // Handle Google login
                                },
                              ),
                              const SizedBox(width: 20),
                              IconButton(
                                icon: const Icon(Icons.window, size: 40, color: Color.fromARGB(255, 0, 0, 0)),
                                onPressed: () {
                                  // Handle Microsoft login
                                },
                              ),
                            ],
                          ),
                          const SizedBox(height: 20),
                          // Linha com 'ou' no meio
                          const Row(
                            children: [
                              Expanded(child: Divider()),
                              Padding(
                                padding: EdgeInsets.symmetric(horizontal: 8.0),
                                child: Text('ou'),
                              ),
                              Expanded(child: Divider()),
                            ],
                          ),
                          const SizedBox(height: 20),
                          TextFormField(
                            controller: _emailController,
                            decoration: const InputDecoration(
                              labelText: 'E-mail',
                              prefixIcon: Icon(Icons.email),
                            ),
                            keyboardType: TextInputType.emailAddress,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Por favor, insira o e-mail';
                              }
                              if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value)) {
                                return 'Formato de e-mail inválido';
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 16),
                          TextFormField(
                            controller: _passwordController,
                            obscureText: true,
                            decoration: const InputDecoration(
                              labelText: 'Senha',
                              prefixIcon: Icon(Icons.lock),
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Por favor, insira a senha';
                              }
                              if (value.length < 8) {
                                return 'Senha deve ter pelo menos 8 caracteres';
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 16),
                          // Row com 'Lembre-se de mim' e 'Esqueci a senha'
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  Checkbox(
                                    value: _rememberMe,
                                    onChanged: (bool? value) {
                                      setState(() {
                                        _rememberMe = value ?? false;
                                      });
                                    },
                                    checkColor: Colors.white,
                                    activeColor: const Color(0xFF326D58),
                                  ),
                                  const Text('Lembre-se de mim'),
                                ],
                              ),
                              TextButton(
                                onPressed: () {
                                  // Navegar para a tela de recuperação de senha
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(builder: (context) => const RestaurarSenha()),
                                  );
                                },
                                child: const Text('Esqueci a senha'),
                              ),
                            ],
                          ),
                          const SizedBox(height: 20),
                          ElevatedButton(
                            onPressed: _login,
                            child: const Text(
                              'Entrar',
                              style: TextStyle(fontSize: 18),
                            ),
                          ),
                          const SizedBox(height: 20),
                          ElevatedButton(
                            onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => const MyApp()),
                            );
                          },
                            child: const Text(
                              'Voltar',
                              style: TextStyle(fontSize: 18),
                            ),
                          ),
                          const SizedBox(height: 16),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Text('Não tem uma conta?'),
                              TextButton(
                                onPressed: () {
                                    Navigator.push(
                                    context,
                                    MaterialPageRoute(builder: (context) => Cadastro()),
                                  );
                                },
                                child: const Text(
                                  'Registrar-se',
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
