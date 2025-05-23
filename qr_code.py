import qrcode

data = "https://www.linkedin.com/in/srikanth-sattiraju"

qr = qrcode.QRCode(version=1, box_size=5, border=5)
qr.add_data(data)
qr.make()

img = qr.make_image(fill_color='black', back_color='white')
img.save('linkedin_qr.png')