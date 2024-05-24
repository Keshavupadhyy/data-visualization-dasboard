from flask import Flask, jsonify
import database 

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def get_data():
    data = database.get_data() 
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)