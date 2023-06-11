package cn.jzyong.main_server.exception;

/**
 * 用户未登录异常
 */
public class NoPermissionException extends Exception {

    private final String message;

    public NoPermissionException() {
        this.message = "权限不足！";
    }

    @Override
    public String getMessage() {
        return message;
    }
}
