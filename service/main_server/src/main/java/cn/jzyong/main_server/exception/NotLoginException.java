package cn.jzyong.main_server.exception;

/**
 * 用户未登录异常
 */
public class NotLoginException extends Exception {

    private final String message;

    public NotLoginException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
