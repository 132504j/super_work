package cn.jzyong.main_server.lib;

import java.util.Objects;
import java.util.regex.Pattern;

public class FormVerify {

    public static class FormVerifyException extends Exception {
        FormVerifyException(String msg) {
            super(msg);
        }
    }

    public static void required(String data, String msg) throws FormVerifyException {
        notEmpty(data, msg);
    }

    public static void required(Integer data, String msg) throws FormVerifyException {
        if (Objects.isNull(data)) throw new FormVerifyException(msg);
        if (data == 0) throw new FormVerifyException(msg);
    }

    public static void required(Long data, String msg) throws FormVerifyException {
        if (Objects.isNull(data)) throw new FormVerifyException(msg);
        if (data == 0) throw new FormVerifyException(msg);
    }

    public static void required(Object data, String msg) throws FormVerifyException {
        if (Objects.isNull(data)) throw new FormVerifyException(msg);
    }

    public static void required(Short data, String msg) throws FormVerifyException {
        if (Objects.isNull(data)) throw new FormVerifyException(msg);
        if (data == 0) throw new FormVerifyException(msg);
    }

    public static void required(Byte data, String msg) throws FormVerifyException {
        if (Objects.isNull(data)) throw new FormVerifyException(msg);
        if (data == 0) throw new FormVerifyException(msg);
    }

    public static void notEmpty(String data, String msg) throws FormVerifyException {
        if (Objects.isNull(data)) throw new FormVerifyException(msg);
        if (data.isEmpty()) throw new FormVerifyException(msg);
    }

    public static void phone11(String data, String msg) throws FormVerifyException {
        if (Objects.isNull(data)) throw new FormVerifyException(msg);
        String regex = "^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(16[5,6])|(17[0-8])|(18[0-9])|(19[1、5、8、9]))\\d{8}$";
        Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        if (!pattern.matcher(data).matches()) throw new FormVerifyException(msg);
    }
}
