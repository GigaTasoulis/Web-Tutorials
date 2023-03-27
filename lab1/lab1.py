import requests

# Ask the user for a URL
url = input("Please enter a URL: ")

# Make an HTTP request to that URL
response = requests.get(url)

# Print the headers of the HTTP response
print("Headers of the HTTP response:")
for header, value in response.headers.items():
    print(f"{header}: {value}")
   
# Check if the server software is specified in the headers
server_header = response.headers.get('Server')
if server_header:
    print(f"\nThe web server is using {server_header} software to respond to the request.")
else:
    print("\nThe server software could not be determined.")


# Check if the page uses cookies and if so, print their names and expiration time
cookies = response.cookies
if cookies:
    print("\nThis page is using cookies.")
    
    for cookie in cookies:
        
        print(f"\nCookie name: {cookie.name}")
        print(f"Expiration time: {cookie.expires}")
        
else:
    print("\nThe page does not use cookies.")
