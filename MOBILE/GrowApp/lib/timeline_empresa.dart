import 'package:flutter/material.dart';
import 'package:grow/perfil_empresa.dart';

class TimeLineEmpresa extends StatelessWidget {
  const TimeLineEmpresa({super.key});

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
                      MaterialPageRoute(builder: (context) => const PerfilEmpresa()),
                    );
                  },
                  child: const CircleAvatar(
                    backgroundColor: Colors.black,
                    child: Text("ADZ", style: TextStyle(color: Colors.white)),
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
                    logoPath: 'assets/josé.jpg',
                    companyName: 'José da Silva Souza',
                    jobTitle: 'Auxiliar de serviços gerais',
                    location: 'Tambaú-SP',
                    description:
                        'José tem 41 anos e é um trabalhador com ampla experiência como auxiliar de serviços gerais. Trabalhou por 8 anos em uma empresa de limpeza, onde adquiriu prática em organização e manutenção de ambientes. Com dedicação e disposição para aprender, ele procura uma oportunidade estável em uma empresa que valorize seu comprometimento. Sua pretensão salarial é de RS 1.500,00.',
                  ),
                  JobCard(
                    logoPath: 'assets/Ana.jpg',
                    companyName: 'Ana Paula Rodrigues',
                    jobTitle: 'Auxiliar de produção',
                    location: 'Araraquara-SP',
                    description:
                        'Ana Paula, de 35 anos, tem experiência em produção e embalagem na área industrial, onde trabalhou por 5 anos em linha de produção. Conhecida por ser pontual e responsável, ela busca uma vaga de auxiliar de produção, onde possa aplicar sua experiência e garantir qualidade nos processos. Sua pretensão salarial está em torno de RS 2.000,00.',
                  ),
                  JobCard(
                    logoPath: 'assets/carlos.jpg',
                    companyName: 'Carlos Henrique dos Santos',
                    jobTitle: 'Ajudante de pedreiro',
                    location: 'Araras-SP',
                    description:
                        'Carlos, com 28 anos, atuou como ajudante de pedreiro e tem experiência em pequenas obras e reformas. Com disposição física e vontade de aprender mais sobre a área da construção, ele busca oportunidades onde possa evoluir profissionalmente, especialmente em empresas que ofereçam treinamento e crescimento. Pretensão salarial: RS 1.700,00.',
                  ),
                  JobCard(
                    logoPath: 'assets/Maria.jpg',
                    companyName: 'Maria José Alves',
                    jobTitle: 'Serviços domésticos',
                    location: 'Leme-SP',
                    description:
                        'Maria José, de 50 anos, tem experiência como cozinheira e serviços domésticos. Trabalhou por mais de 10 anos em uma residência e em uma pequena lanchonete local, onde era responsável pelo preparo de alimentos e limpeza. Ela procura uma vaga que valorize sua experiência e amor pela cozinha, com uma pretensão salarial de RS 1.800,00.',
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
