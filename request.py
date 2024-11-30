from mitmproxy import http
from AES import decrypt_response,decrypt_request,encrypt
import json

url = "https://v2.wdm.ituoniao.cn"
api = {
    "SetPhoneAngle" : "Rollcall.Student.SetTurnOverPhone",
    "Rollcall" : "Rollcall.Student.IsRollcallActive"
}

def modify_data(data) :
    dict = {
        "service" : api["SetPhoneAngle"],
        "rcid" : data["rcid"],
        "session" : data["session"],
        "__debug__" : 1,
        "ts" : data["ts"],
        "no" : data["no"],
        "sign" : data["sign"],
        "status" : "down"
    }
    if data["service"] == api["SetPhoneAngle"] :
        return dict

def modify_data2(data) :
    dict = {
        "service" : api["SetPhoneAngle"],
        "rcid" : data["rcid"],
        "session" : data["session"],
        "__debug__" : 1,
        "ts" : data["ts"],
        "no" : data["no"],
        "sign" : data["sign"],
        "status" : "down"
    }
    if data["service"] == api["Rollcall"] :
        return dict

def request(flow: http.HTTPFlow) :
    if flow.request.url.startswith(url):
        print("开始运行")
        query_params = flow.request.query
        ct = query_params.get("ct")
        iv = query_params.get("iv")
        s = query_params.get("s")
        
        # 构造 JSON 格式数据并解密
        encrypted_data = {"ct": ct, "iv": iv, "s": s}
        decrypted_data = json.loads(decrypt_request(encrypted_data))
        
        if decrypted_data["service"] == api["SetPhoneAngle"] :
            print("匹配成功")
            print("解密后的请求数据：", decrypted_data)
            
            # 匹配并修改数据
            modified_data = modify_data(decrypted_data)
            
            print("修改后的数据：", modified_data)
            # 加密数据并替换请求体
            encrypted_result = encrypt(modified_data)
            flow.request.query["ct"] = encrypted_result["ct"]
            flow.request.query["iv"] = encrypted_result["iv"]
            flow.request.query["s"] = encrypted_result["s"]
        # elif decrypted_data["service"] == api["Rollcall"] :
        #     print("匹配成功")
        #     print("解密后的请求数据：", decrypted_data)
            
        #     # 匹配并修改数据
        #     modified_data = modify_data2(decrypted_data)
        #     if modified_data != decrypted_data:
        #         print("修改后的数据：", modified_data)
        #         # 加密数据并替换请求体
        #         encrypted_result = encrypt(modified_data)
        #         print("修改后的加密数据：", encrypted_result)
        #         flow.request.query["ct"] = encrypted_result["ct"]
        #         flow.request.query["iv"] = encrypted_result["iv"]
        #         flow.request.query["s"] = encrypted_result["s"]
        else :
            return