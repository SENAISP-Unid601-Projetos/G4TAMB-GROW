import 'package:flutter/material.dart';
import 'package:grow/main.dart';

class Cadastro extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Color(0xFF326D58),
        hintColor: Color(0xFF326D58),
        visualDensity: VisualDensity.adaptivePlatformDensity,
        inputDecorationTheme: InputDecorationTheme(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
          ),
        ),
      ),
      home: TelaInicial(),
    );
  }
}

class TelaInicial extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(
        title: Text('Selecione o Tipo de Cadastro', style: TextStyle(color: Colors.white),),
        centerTitle: true,
        backgroundColor: Color(0xFF326D58),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const MyApp()),
            );
          },
        ),
        iconTheme: IconThemeData(color: Colors.white),
      ),
      body: Stack(
        children: [
          // Imagem de fundo
          Positioned.fill(
            child: Image.asset(
              'assets/fundo_cadastro.png', // Substitua pelo caminho correto da sua imagem de fundo
              fit: BoxFit.cover, // Ajusta a imagem para cobrir toda a área disponível
            ),
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  width: screenWidth * 0.8, // Largura proporcional à largura da tela
                  child: ElevatedButton(
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
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => CadastroClienteScreen(tipoCadastro: 'Usuário')),
                            );
                          },
                          child: Text('Registrar como Usuário', style: TextStyle(color: Colors.white),),
                        ),
                ),
                SizedBox(height: 20),
                 SizedBox(
                  width: screenWidth * 0.8, // Largura proporcional à largura da tela
                  child: ElevatedButton(
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
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => CadastroClienteScreen(tipoCadastro: 'Empresa')),
                            );
                          },
                          child: Text('Registrar como Empresa', style: TextStyle(color: Colors.white),),
                        ),
                ),
                
              ],
            ),
          ),
        ]
      )
    );
  }
}

class CadastroClienteScreen extends StatefulWidget {
  final String tipoCadastro;

  CadastroClienteScreen({required this.tipoCadastro});

  @override
  _CadastroClienteScreenState createState() => _CadastroClienteScreenState();
}

class _CadastroClienteScreenState extends State<CadastroClienteScreen> {
  final _formKey = GlobalKey<FormState>();

  // Controladores dos campos de texto
  final TextEditingController _nomeController = TextEditingController();
  final TextEditingController _sobrenomeController = TextEditingController();
  final TextEditingController _dataNascimentoController = TextEditingController();
  final TextEditingController _cpfController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _confirmaEmailController = TextEditingController();
  final TextEditingController _telefoneController = TextEditingController();
  final TextEditingController _celularController = TextEditingController();
  final TextEditingController _cepController = TextEditingController();
  final TextEditingController _estadoController = TextEditingController();
  final TextEditingController _cidadeController = TextEditingController();
  final TextEditingController _bairroController = TextEditingController();
  final TextEditingController _enderecoController = TextEditingController();
  final TextEditingController _complementoController = TextEditingController();
  final TextEditingController _senhaController = TextEditingController();
  final TextEditingController _confirmaSenhaController = TextEditingController();

  final TextEditingController _razaoSocialController = TextEditingController();
  final TextEditingController _cnpjController = TextEditingController();
  final TextEditingController _dataAberturaController = TextEditingController();
  final TextEditingController _representanteController = TextEditingController();
  final TextEditingController _cpfRepresentanteController = TextEditingController();
  final TextEditingController _tipoLogradouroController = TextEditingController();

  // Variáveis de estado
  String? _genero;
  bool _aceitoTermos = false;
  bool _aceitoAtualizacoes = false;
  bool _decretoLei1 = false;
  bool _decretoLei2 = false;
  bool _decretoLei3 = false;
  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Cadastro de ${widget.tipoCadastro}", style: TextStyle(color: Colors.white),),
        centerTitle: true,
        backgroundColor: Color(0xFF326D58),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        iconTheme: IconThemeData(color: Colors.white),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              _buildSectionTitle(widget.tipoCadastro == 'Usuário' ? 'Informações Pessoais' : 'Informações da Empresa'),
              if (widget.tipoCadastro == 'Usuário') ...[
                _buildTextField(_nomeController, 'Nome'),
                _buildTextField(_sobrenomeController, 'Sobrenome'),
                _buildTextField(_dataNascimentoController, 'Data de Nascimento', hintText: 'DD/MM/AAAA'),
                _buildTextField(_cpfController, 'CPF'),
                _buildGeneroRadio(),
              ] else ...[
                _buildTextField(_razaoSocialController, 'Razão Social'),
                _buildTextField(_cnpjController, 'CNPJ'),
                _buildTextField(_dataAberturaController, 'Data de Abertura', hintText: 'DD/MM/AAAA'),
                _buildTextField(_representanteController, 'Representante Legal'),
                _buildTextField(_cpfRepresentanteController, 'CPF do Representante Legal'),
              ],
              Divider(),
              _buildSectionTitle('Contato'),
              _buildTextField(_emailController, 'Email'),
              _buildTextField(_confirmaEmailController, 'Confirme seu Email', validator: (value) {
                if (value != _emailController.text) {
                  return 'Os emails não correspondem';
                }
                return null;
              }),
              _buildTextField(_telefoneController, 'Telefone'),
              _buildTextField(_celularController, 'Celular'),
              Divider(),
              _buildSectionTitle('Endereço'),
              _buildTextField(_cepController, 'CEP'),
              _buildTextField(_estadoController, 'Estado'),
              _buildTextField(_cidadeController, 'Cidade'),
              _buildTextField(_bairroController, 'Bairro'),
              if (widget.tipoCadastro == 'Empresa') 
                _buildTextField(_tipoLogradouroController, 'Tipo de Logradouro'),
              _buildTextField(_enderecoController, 'Endereço'),
              _buildTextField(_complementoController, 'Complemento'),
              Divider(),
              _buildSectionTitle('Senha'),
              _buildPasswordField(_senhaController, 'Crie uma Senha', _obscurePassword, () {
                setState(() {
                  _obscurePassword = !_obscurePassword;
                });
              }),
              _buildPasswordField(_confirmaSenhaController, 'Confirme a Senha', _obscureConfirmPassword, () {
                setState(() {
                  _obscureConfirmPassword = !_obscureConfirmPassword;
                });
              }, validator: (value) {
                if (value != _senhaController.text) {
                  return 'As senhas não correspondem';
                }
                return null;
              }),
              Divider(),
              if (widget.tipoCadastro == 'Usuário') ...[
                CheckboxListTile(
                  title: Text('Declaro que li e aceito todos os termos e condições de uso.'),
                  value: _aceitoTermos,
                  onChanged: (bool? value) {
                    setState(() {
                      _aceitoTermos = value!;
                    });
                  },
                ),
                CheckboxListTile(
                  title: Text('Aceito receber atualizações por email.'),
                  value: _aceitoAtualizacoes,
                  onChanged: (bool? value) {
                    setState(() {
                      _aceitoAtualizacoes = value!;
                    });
                  },
                ),
              ],
              if (widget.tipoCadastro == 'Empresa') ...[
                CheckboxListTile(
                  title: Text('A empresa declara que leu e aceita todos os termos e condições de uso.'),
                  value: _aceitoTermos,
                  onChanged: (bool? value) {
                    setState(() {
                      _aceitoTermos = value!;
                    });
                  },
                ),
                CheckboxListTile(
                  title: Text('A empresa aceita receber mensagens por email da Grow e de seus usuários.'),
                  value: _aceitoAtualizacoes,
                  onChanged: (bool? value) {
                    setState(() {
                      _aceitoAtualizacoes = value!;
                    });
                  },
                ),
                CheckboxListTile(
                  title: Text('A empresa está ciente do decreto lei nº 5.452 de 01º de maio de 1943.'),
                  value: _decretoLei1,
                  onChanged: (bool? value) {
                    setState(() {
                      _decretoLei1 = value!;
                    });
                  },
                ),
                CheckboxListTile(
                  title: Text('A empresa está ciente do decreto lei nº 3.708 de 10º de janeiro de 1919.'),
                  value: _decretoLei2,
                  onChanged: (bool? value) {
                    setState(() {
                      _decretoLei2 = value!;
                    });
                  },
                ),
                CheckboxListTile(
                  title: Text('A empresa está ciente do decreto lei nº 6.019 de 03º de janeiro de 1944.'),
                  value: _decretoLei3,
                  onChanged: (bool? value) {
                    setState(() {
                      _decretoLei3 = value!;
                    });
                  },
                ),
              ],
              SizedBox(height: 20),
              Center(
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    padding: EdgeInsets.symmetric(horizontal: 40, vertical: 15), backgroundColor: Color(0xFF326D58),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Cadastro realizado com sucesso!')),
                      );
                    }
                  },
                  child: Text(
                    'Continuar',
                    style: TextStyle(fontSize: 18, color: Colors.white),

                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Widget para título das seções
  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: Color(0xFF326D58),
        ),
      ),
    );
  }

  // Widget para campos de texto
  Widget _buildTextField(TextEditingController controller, String label,
      {bool obscureText = false, String? hintText, String? Function(String?)? validator}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: TextFormField(
        controller: controller,
        obscureText: obscureText,
        decoration: InputDecoration(
          labelText: label,
          hintText: hintText,
        ),
        validator: validator ?? (value) {
          if (value == null || value.isEmpty) {
            return 'Por favor, preencha este campo';
          }
          return null;
        },
      ),
    );
  }

  // Widget para campos de senha com visibilidade controlada
  Widget _buildPasswordField(TextEditingController controller, String label, bool obscureText, VoidCallback toggleVisibility, {String? Function(String?)? validator}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: TextFormField(
        controller: controller,
        obscureText: obscureText,
        decoration: InputDecoration(
          labelText: label,
          suffixIcon: IconButton(
            icon: Icon(obscureText ? Icons.visibility_off : Icons.visibility),
            onPressed: toggleVisibility,
          ),
        ),
        validator: validator ?? (value) {
          if (value == null || value.isEmpty) {
            return 'Por favor, preencha este campo';
          }
          return null;
        },
      ),
    );
  }

  // Widget para os botões de gênero
  Widget _buildGeneroRadio() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          "Gênero",
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF326D58)),
        ),
        RadioListTile<String>(
          title: const Text('Masculino'),
          value: 'Masculino',
          groupValue: _genero,
          onChanged: (value) {
            setState(() {
              _genero = value;
            });
          },
        ),
        RadioListTile<String>(
          title: const Text('Feminino'),
          value: 'Feminino',
          groupValue: _genero,
          onChanged: (value) {
            setState(() {
              _genero = value;
            });
          },
        ),
        RadioListTile<String>(
          title: const Text('Outro'),
          value: 'Outro',
          groupValue: _genero,
          onChanged: (value) {
            setState(() {
              _genero = value;
            });
          },
        ),
      ],
    );
  }
}
