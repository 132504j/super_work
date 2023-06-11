package cn.jzyong.main_server.lib;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.HashMap;

@Data
public class AjaxResult extends HashMap<String, Object> {
    private int code;

    private String msg;

    private Object data;

    public AjaxResult(HttpStatus code, Object data, String msg) {
        this.put("code", code.value());
        this.put("data", data);
        this.put("msg", msg);
    }

    public static AjaxResult badRequest(String msg) {
        return new AjaxResult(HttpStatus.BAD_REQUEST, null, msg);
    }

    public static AjaxResult ok(Object data, String msg) {
        return new AjaxResult(HttpStatus.OK, data, msg);
    }
}
