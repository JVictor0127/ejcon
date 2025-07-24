// Este script lida com as submissões do formulário e as salva em uma planilha Google.

// Substitua 'SEU_ID_DA_PLANILHA' pelo ID real da sua Planilha Google.
// O ID da planilha pode ser encontrado no URL da sua planilha:
// https://docs.google.com/spreadsheets/d/SEU_ID_DA_PLANILHA/edit#gid=0
const SPREADSHEET_ID = '10mDGrO4YRbd6sJYMKZt_5scP5h3euU4aU7YGtfdGncs'; // <-- ATUALIZE AQUI!
const SHEET_NAME = 'leadsEjcon'; // Nome da aba onde os dados serão salvos (geralmente 'Sheet1' por padrão)

/**
 * Função principal para lidar com requisições POST do formulário.
 * @param {Object} e O objeto de evento que contém os parâmetros da requisição.
 * @returns {GoogleAppsScript.Content.TextOutput} Uma resposta de sucesso ou erro.
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    // Obtenha os dados do formulário
    const formData = e.parameter;
    
    // Crie um array com os dados na ordem das colunas da planilha
    // Certifique-se de que os nomes dos campos (name, email, contact, message)
    // correspondem aos atributos 'name' dos seus inputs HTML.
    const rowData = [
      new Date(), // Timestamp da submissão
      formData.name,
      formData.email,
      formData.contact || '', // Campo opcional, use string vazia se não houver valor
      formData.message
    ];

    // Adicione a nova linha à planilha
    sheet.appendRow(rowData);

    // Retorne uma resposta de sucesso
    return ContentService.createTextOutput(JSON.stringify({ result: 'success', message: 'Dados salvos com sucesso!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Registre o erro para depuração
    console.error("Erro ao processar a submissão do formulário: " + error.message);

    // Retorne uma resposta de erro
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Erro ao salvar os dados: ' + error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Função para lidar com requisições GET (opcional, mas boa prática para implantação).
 * Pode ser usada para testar se o web app está funcionando.
 */
function doGet(e) {
  return ContentService.createTextOutput("Este é o endpoint para submissões POST do formulário. Por favor, envie os dados via POST.")
    .setMimeType(ContentService.MimeType.TEXT);
}
