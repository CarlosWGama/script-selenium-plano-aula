

import { By } from 'selenium-webdriver'  //ES Module
import { Options, Driver } from "selenium-webdriver/chrome.js";
import { LP1, LBD, IA, SM, LP6, PP } from './modelos/index.js'

//PASSOS
//PASSO 1 - RODE O SCRIPT
//chrome.exe --remote-debugging-port=9111
//msedge.exe --remote-debugging-port=9111

//PASSO 2 - ACESSE A PÁGINA QUE IRÁ RECEBER OS COMANDOS

async function teste() {

    // ============ Configurações ==================== ///
    //Aulas
    const planos = PP;
    // --------------------------------------------------------------------------------------
    // =================== SCRIPT AUTOMAÇÃO ======================= //
    //new Builder().forBrowser().build() = Cria uma conexão com o navegador
    const options = new Options();
    options.debuggerAddress("127.0.0.1:9111")
    const driver = Driver.createSession(options)
    
    // ============ BUSCA O FILTRO
    console.log('ABRINDO CAMPOS');
    //Abre o botão de fitlro
    let camposAbrir = await driver.findElements(By.className('mat-expansion-indicator'));
    console.log('TOTAL AULAS: ', camposAbrir.length);
    for(let i =  camposAbrir.length-1; i >= 0; i--) {
        await camposAbrir[i].click();
        await driver.manage().setTimeouts({ implicit: 2000 });
        console.log(`${i+1} - OK`)
    }

    console.log('INSERINDO DADOS');
    let idCampo = 2;
    //Cada dia de aula representa 2 aulas
    for (let i = 0; i < (planos.length * 2); i++) {
        
        const campoPrevisto = await driver.findElement(By.xpath(`//*[@id="cdk-accordion-child-${idCampo}"]/div/div[2]/div[1]/po-textarea/po-field-container/div/div[2]/textarea`));
        const campoRealizado = await driver.findElement(By.xpath(`//*[@id="cdk-accordion-child-${idCampo}"]/div/div[2]/div[3]/po-textarea/po-field-container/div/div[2]/textarea`));
        await campoPrevisto.sendKeys(planos[Math.floor(i/2)])
        await campoRealizado.sendKeys(planos[Math.floor(i/2)])
        idCampo++;
        console.log(`${Math.floor(i/2)+1} - ${(i%2)+1} - OK`)
    }

    console.log(' --- FIM --- ')
    
}

teste();
