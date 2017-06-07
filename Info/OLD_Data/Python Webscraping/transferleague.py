from bs4 import BeautifulSoup
from urllib2 import urlopen
 
my_address = "http://www.irishtimes.com/"
html_page = urlopen(my_address)
html_text = html_page.read()
soup = BeautifulSoup(html_text, "html.parser")
 
print soup.get_text().encode("utf-8")

# Put all image elements in a list
#tabledata = soup.find_all("script")

#print tabledata

# Iterate over 'images' list and
# print the 'src' of each image
#for tr in tabledata:
#    print tr['innerText']