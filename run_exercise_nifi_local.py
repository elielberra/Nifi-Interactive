import os
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import sleep

# Changing the kernel directory to the folder path
script_path = os.path.realpath(__file__)
folder_path = os.path.dirname(script_path)
os.chdir(folder_path)

options = webdriver.ChromeOptions()
options.add_argument('start-maximized')
# Ignore not secure connections
options.add_argument('--ignore-ssl-errors=yes')
options.add_argument('--ignore-certificate-errors')
# Ignore 'Chrome is being controlled by automated test software'
options.add_experimental_option("useAutomationExtension", False)
options.add_experimental_option("excludeSwitches",["enable-automation"])
# Open browser with developer tools
# options.add_argument("auto-open-devtools-for-tabs")
# Open browser without menu options on the top
# options.add_argument("--kiosk");

driver = webdriver.Chrome(ChromeDriverManager().install(), options = options)
url_nifi = 'https://nifi-vm.local:8088/nifi/login'
driver.get(url_nifi)

credentials = {}
credentials['user'] = 'admin'
credentials['pass'] = '1'

driver.find_element(By.ID, 'username').send_keys(credentials['user'])
driver.find_element(By.ID, 'password').send_keys(credentials['pass'])
driver.find_element(By.ID, 'login-submission-button').click()

WebDriverWait(driver, 120).until(EC.presence_of_element_located((By.ID, "canvas-container")))

#This variables determines wether to enter or not into a specific process group for speeding up the testing process
log_into_process_group = False
url_process_group = ""
if log_into_process_group == True:
    driver.get(url_process_group)

WebDriverWait(driver, 120).until(EC.presence_of_element_located((By.ID, "canvas-container")))
sleep(2)
driver.execute_script(open('./main.js').read())

WebDriverWait(driver, 3600).until(EC.presence_of_element_located((By.ID, "destroyWindow")))
driver.quit()