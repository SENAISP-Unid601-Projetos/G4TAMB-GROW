import 'package:flutter/material.dart';
import 'package:grow/perfil.dart';

class TimeLine extends StatelessWidget {
  const TimeLine({super.key});

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
        elevation: 0,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Image.asset(
              'assets/grow_logo.jpeg',
              height: 40,
            ),
            Row(
              children: [
                const Icon(Icons.search, color: Colors.black, size: 28),
                const SizedBox(width: 20),
                Stack(
                  children: [
                    const Icon(Icons.notifications, color: Colors.black, size: 28),
                    Positioned(
                      right: 0,
                      child: Container(
                        padding: const EdgeInsets.all(2),
                        decoration: BoxDecoration(
                          color: Colors.red,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        constraints: const BoxConstraints(
                          minWidth: 18,
                          minHeight: 18,
                        ),
                        child: const Text(
                          '18',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 12,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    )
                  ],
                ),
                const SizedBox(width: 20),
                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const Perfil()),
                    );
                  },
                  child: const CircleAvatar(
                    backgroundColor: Colors.black,
                    child: Text("D", style: TextStyle(color: Colors.white)),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      body: 
              ListView(
                shrinkWrap: true,
                children: const [
                  JobCard(
                    logoPath: 'assets/adz_logo.png',
                    companyName: 'ADZ Máquinas',
                    jobTitle: 'Assistente de Montagem',
                    location: 'Tambaú-SP',
                    description:
                        'Vaga para auxiliar responsável pela montagem de produtos, componentes ou máquinas. Carga horária diária de 8h. Salário a Combinar.',
                  ),
                  JobCard(
                    logoPath: 'assets/gencau_logo.png',
                    companyName: 'Gencau',
                    jobTitle: 'Motorista de Caminhão',
                    location: 'Tambaú e região',
                    description:
                        'Buscamos alguém com CNH E para o transporte de caminhão de carga.',
                  ),
                  JobCard(
                    logoPath: 'assets/pierim_logo.jpg',
                    companyName: 'Pierim Supermercados',
                    jobTitle: 'Atendente de Caixa',
                    location: 'Tambaú-SP',
                    description:
                        'Buscamos pessoas atenciosas e simpáticas, que saibam trabalhar em grupo. Carga horária de 8h de segunda a sábado.',
                  ),
                  JobCard(
                    logoPath: 'assets/fit_logo.jpg',
                    companyName: 'Fit Concreto',
                    jobTitle: 'Motorista de Caminhão',
                    location: 'Longas viagens',
                    description:
                        'Buscamos motoristas com disponibilidade para longas viagens. Carga horária variável, inclui fim de semana.',
                  ),
                ],
              ),
    );
  }
}

class JobCard extends StatelessWidget {
  final String logoPath;
  final String companyName;
  final String jobTitle;
  final String location;
  final String description;

  const JobCard({
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
            IconButton(
              icon: const Icon(Icons.favorite_border),
              onPressed: () {},
            ),
            IconButton(
              icon: const Icon(Icons.save_alt),
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}
