from flask import Flask, request, send_file, render_template
import conversors.nova_to_eis_analyser as nova_to_eis_analyser
import os
import tempfile

app = Flask(__name__)

file_path = os.path.join(tempfile.gettempdir(), 'converted.txt')

@app.route('/convert', methods=['POST'])
def convert_file():
    file = request.files.get('file')
    try:
        nova_to_eis_analyser.convert(file)
        return send_file(file_path, attachment_filename='converted.txt')
    except Exception as e:
        return str(e)

@app.route('/')
def convert_page():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)