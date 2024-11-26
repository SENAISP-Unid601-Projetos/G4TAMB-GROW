import 'package:flutter/material.dart';
import 'package:grow/cadastro.dart';
import 'package:grow/login.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Grow Business',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Grow Business'),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    // Obtém as dimensões da tela
    final double screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      body: Stack(
        children: [
          // Imagem de fundo
          Positioned.fill(
            child: Image.asset(
              'assets/background.jpg', // Substitua pelo caminho correto da sua imagem de fundo
              fit: BoxFit.cover, // Ajusta a imagem para cobrir toda a área disponível
            ),
          ),
          Align(
            alignment: Alignment.center,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(height: 80),
                Image.asset(
                  'assets/logo.png', // Substitua pelo caminho correto da sua imagem do logo
                  width: screenWidth * 0.85, // Largura proporcional à largura da tela
                  height: screenWidth * 0.85, // Altura proporcional à largura da tela
                ),
                const SizedBox(height: 70), // Espaço entre a imagem do logo e os botões
                // Espaço reduzido para empurrar os botões para baixo
                Expanded(
                  child: Align(
                    alignment: Alignment.bottomCenter,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        // Container para garantir que os botões tenham o mesmo tamanho
                        SizedBox(
                          width: screenWidth * 0.8, // Largura proporcional à largura da tela
                          child: ElevatedButton(
                            onPressed: () {
                              Navigator.push(context, MaterialPageRoute(builder: (context) => const Login()));
                            },
                            style: ElevatedButton.styleFrom(
                              foregroundColor: Colors.white,
                              backgroundColor: const Color(0xFF326D58), // Cor do texto do botão
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10), // Padding reduzido
                              textStyle: const TextStyle(fontSize: 15),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10), // Bordas arredondadas
                              ),
                              elevation: 5, // Adiciona uma sombra
                            ),
                            child: const Text('Entrar'),
                          ),
                        ),
                        const SizedBox(height: 10), // Espaço reduzido entre os botões
                        SizedBox(
                          width: screenWidth * 0.8, // Largura proporcional à largura da tela
                          child: OutlinedButton(
                            onPressed: () {
                              Navigator.push(context, MaterialPageRoute(builder: (context) => Cadastro()));
                            },
                            style: OutlinedButton.styleFrom(
                              foregroundColor: Colors.white,
                              side: const BorderSide(color: Colors.white, width: 1), // Borda branca
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10), // Padding reduzido
                              textStyle: const TextStyle(fontSize: 15),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10), // Bordas arredondadas
                              ),
                              backgroundColor: Colors.transparent, // Fundo transparente
                            ),
                            child: const Text('Cadastre-se'),
                          ),
                        ),
                        const SizedBox(height: 10), // Espaço reduzido entre os botões e o texto "Saiba Mais"
                        Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Text(
                              'Novo por aqui? ',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.w600, // Fonte mais destacada
                              ),
                            ),
                            GestureDetector(
                              onTap: () {
                                // Ação ao clicar em "Saiba Mais"
                                print('Saiba Mais clicado');
                              },
                              child: const Text(
                                'Saiba Mais',
                                style: TextStyle(
                                  color: Color(0xFF326D58), // Cor verde dos botões
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                Image.asset(
                  'assets/senai.png', // Substitua pelo caminho correto da sua imagem do logo SENAI
                  width: screenWidth * 0.17, // Largura proporcional à largura da tela
                  height: screenWidth * 0.17, // Altura proporcional à largura da tela
                ),
              ],
            ),
          ),
        ],
     ),
  );
  }
}