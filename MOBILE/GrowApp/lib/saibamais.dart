import 'package:flutter/material.dart';
import 'package:grow/main.dart';

class SaibaMais extends StatelessWidget {
  const SaibaMais({super.key});


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Grow Jobs',
      theme: ThemeData(
        primarySwatch: Colors.green,
        scaffoldBackgroundColor: Colors.grey[200],
      ),
      home: const HomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const MyApp()),
            );
          },
        ),
        elevation: 0,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'assets/grow_logo.jpeg',
              height: 40,
            ),
          ],
        ),
      ),
      body: 
        ListView(
          shrinkWrap: true,
          children: const [
            InfoCard(
              logoPath: 'assets/grow_logo.jpeg',
              companyName: 'Grow',
              jobTitle: 'Grow Bussiness',
              location: 'Tambaú-SP',
              description:
                  'Desenvolvendo o Amanhã, Hoje! Somos uma equipe de 8 alunos capacitados pelo SESI-SENAI, e por meio desse site utilizamos da abordagem prática para enfrentar os desafiosdo mercado de trabalho de maneira inovadora e eficiente. Na nossa equipe trazemos a dedicação, a inovação e o aprendizado constante como pilares fundamentais para desenvolver soluções de qualidade. Aqui, aplicamos os conhecimentos adquiridos em sala de aula de forma criativa, unindo teoria e prática com o apoio de professores experientes. Nosso diferencial está no comprometimento com a excelência e na busca por inovação, além disso, cultivamos habilidades fundamentais como o trabalho em equipe, a resolução de problemas e o pensamento crítico, o que nos torna capazes de entregar resultados que vão além das expectativas.',
            ),
          ],
        ),
    );
  }
}

class InfoCard extends StatelessWidget {
  final String logoPath;
  final String companyName;
  final String jobTitle;
  final String location;
  final String description;

  const InfoCard({
    super.key,
    required this.logoPath,
    required this.companyName,
    required this.jobTitle,
    required this.location,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Image.asset(logoPath, width: 100),
                  const SizedBox(width: 16),
                  Text(
                    companyName,
                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    jobTitle,
                    style: TextStyle(fontSize: 16, color: Colors.grey[600]),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Local: $location',
                    style: const TextStyle(color: Colors.grey),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    description,
                    style: const TextStyle(color: Colors.black),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
