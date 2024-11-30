# 与逆向得到的加解密函数联动
import execjs
import json

js_file_path = "main.js"

def encrypt(data):
    #current_dir = os.path.dirname(__file__)
    #os.path.join(current_dir, 'getSign', 'main.js')
    with open(js_file_path, 'r', encoding='utf-8') as f:
        js_code = f.read()

    ctx = execjs.get("Node").compile(js_code)
    sign = ctx.call("encrypt",data)
    return sign


def decrypt(data,isRequest):
    #current_dir = os.path.dirname(__file__)
    #os.path.join(current_dir, 'getSign', 'main.js')
    with open(js_file_path, 'r', encoding='utf-8') as f:
        js_code = f.read()

    ctx = execjs.get("Node").compile(js_code)
    sign = ctx.call("decrypt",data,isRequest)
    return sign

# 传入JSON字符串,响应
def decrypt_response(str) :
    return decrypt(data=str,isRequest=False)
# 传入请求Query的JSON
def decrypt_request(dict) :
    str = json.dumps(dict)
    return decrypt(data=str,isRequest=True)
