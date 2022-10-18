import { StyleSheet, Text, View,TouchableOpacity, Button, ScrollView, Image, Alert, Modal, Pressable} from 'react-native';
import {React} from 'react-native';
import styles from '../Css/pageCss';
import { LinearGradient } from 'expo-linear-gradient';
export default function NewsView()
{   
    return(
    <LinearGradient colors={['#663399','#CC33FF','#CC66FF','#FFCCFF','#FFFFFF', '#FFCCFF','#CC66FF','#CC33FF', '#663399']}
        start={{ x: 0.1, y: 0 }}
        end={{x: 0.7, y:1}} style={styles.linearBackground}>
    <View style={styles.indexStyle}>
        <ScrollView>

        <TouchableOpacity>
        <View style={styles.mainCard}>
            <View style={styles.imageNews}>
                <Image style={styles.imageNews} source={{
                    uri: "https://www.galaxycine.vn/media/2022/8/29/may-ngung-quay--ho-van-dien--nhung-ngoi-sao-tan-tam-nhat-5_1661791993621.jpg"}}>
                </Image>
            </View>
            <View style={styles.titleNews}>
                <Text style={styles.titleText}>
                Máy Ngừng Quay, Họ Vẫn Diễn - Những Ngôi Sao Tận Tâm Nhất!
                </Text>
            </View>
            <View style={styles.contentNews}>
                <Text>
                Đóng phim chẳng phải công việc dễ dàng gì. Làm minh tinh thì dễ, làm diễn viên thực lực được công chúng công nhận lại hết sức khó khăn. Dưới đây là danh sách những ngôi sao đã cống hiến hết mình để cho ra đời những thước phim huyền thoại trên màn ảnh!
                </Text>
            </View>
            <View style={[styles.otherContent,{marginLeft:'27.5%'}]}>
                <Text style={styles.otherContentText}>
                Nhấn vào để xem thông tin chi tiết!!!
                </Text>
            </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.mainCard}>
            <View style={styles.imageNews}>
                <Image style={styles.imageNews} source={{
                    uri: "https://www.galaxycine.vn/media/2022/8/29/may-ngung-quay--ho-van-dien--nhung-ngoi-sao-tan-tam-nhat-5_1661791993621.jpg"}}>
                </Image>
            </View>
            <View style={styles.titleNews}>
                <Text style={styles.titleText}>
                Máy Ngừng Quay, Họ Vẫn Diễn - Những Ngôi Sao Tận Tâm Nhất!
                </Text>
            </View>
            <View style={styles.contentNews}>
                <Text>
                Đóng phim chẳng phải công việc dễ dàng gì. Làm minh tinh thì dễ, làm diễn viên thực lực được công chúng công nhận lại hết sức khó khăn. Dưới đây là danh sách những ngôi sao đã cống hiến hết mình để cho ra đời những thước phim huyền thoại trên màn ảnh!
                </Text>
            </View>
            <View style={[styles.otherContent,{marginLeft:'27.5%'}]}>
                <Text style={styles.otherContentText}>
                Nhấn vào để xem thông tin chi tiết!!!
                </Text>
            </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.mainCard}>
            <View style={styles.imageNews}>
                <Image style={styles.imageNews} source={{
                    uri: "https://www.galaxycine.vn/media/2022/8/29/may-ngung-quay--ho-van-dien--nhung-ngoi-sao-tan-tam-nhat-5_1661791993621.jpg"}}>
                </Image>
            </View>
            <View style={styles.titleNews}>
                <Text style={styles.titleText}>
                Máy Ngừng Quay, Họ Vẫn Diễn - Những Ngôi Sao Tận Tâm Nhất!
                </Text>
            </View>
            <View style={styles.contentNews}>
                <Text>
                Đóng phim chẳng phải công việc dễ dàng gì. Làm minh tinh thì dễ, làm diễn viên thực lực được công chúng công nhận lại hết sức khó khăn. Dưới đây là danh sách những ngôi sao đã cống hiến hết mình để cho ra đời những thước phim huyền thoại trên màn ảnh!
                </Text>
            </View>
            <View style={[styles.otherContent,{marginLeft:'27.5%'}]}>
                <Text style={styles.otherContentText}>
                Nhấn vào để xem thông tin chi tiết!!!
                </Text>
            </View>
        </View>
        </TouchableOpacity>


        </ScrollView>
    </View>
    </LinearGradient>
    );
}