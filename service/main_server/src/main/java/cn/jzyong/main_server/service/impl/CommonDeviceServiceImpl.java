package cn.jzyong.main_server.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import cn.jzyong.main_server.entity.CommonDevice;
import cn.jzyong.main_server.service.CommonDeviceService;
import cn.jzyong.main_server.mapper.CommonDeviceMapper;
import org.springframework.stereotype.Service;

/**
* @author 0
* @description 针对表【common_device(设备表，记录用户设备id)】的数据库操作Service实现
* @createDate 2023-06-11 17:51:48
*/
@Service
public class CommonDeviceServiceImpl extends ServiceImpl<CommonDeviceMapper, CommonDevice>
    implements CommonDeviceService{

}




