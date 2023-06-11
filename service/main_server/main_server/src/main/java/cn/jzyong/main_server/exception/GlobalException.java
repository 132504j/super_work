package cn.jzyong.main_server.exception;

import cn.jzyong.main_server.lib.AjaxResult;
import cn.jzyong.main_server.lib.FormVerify;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(annotations = RestController.class)
public class GlobalException {
    @ExceptionHandler({Exception.class})
    public AjaxResult exceptionHandler(Exception e) {
        log.error(e.getMessage(), e);
        return new AjaxResult(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
    }

    @ExceptionHandler({NotLoginException.class})
    public AjaxResult exceptionHandler(NotLoginException e) {
        log.error(e.getMessage());
        return new AjaxResult(HttpStatus.UNAUTHORIZED, null, "登录过期，请重新登录！");
    }

    @ExceptionHandler({FormVerify.FormVerifyException.class})
    public AjaxResult exceptionHandler(FormVerify.FormVerifyException e) {
        log.error(e.getMessage());
        return new AjaxResult(HttpStatus.BAD_REQUEST, null, e.getMessage());
    }

    @ExceptionHandler({NoPermissionException.class})
    public AjaxResult exceptionHandler(NoPermissionException e) {
        log.error(e.getMessage());
        return new AjaxResult(HttpStatus.BAD_REQUEST, null, "权限不足！");
    }
}
