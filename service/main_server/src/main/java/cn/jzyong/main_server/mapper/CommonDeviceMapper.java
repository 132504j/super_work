package cn.jzyong.main_server.mapper;

import cn.jzyong.main_server.entity.CommonDevice;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author 0
 * @description 针对表【common_device(设备表，记录用户设备id)】的数据库操作Mapper
 * @createDate 2023-06-11 17:51:48
 * @Entity cn.jzyong.main_server.entity.CommonDevice
 */
@Mapper
public interface CommonDeviceMapper extends BaseMapper<CommonDevice> {

}




