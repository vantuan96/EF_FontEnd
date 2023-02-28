update Clinics set Data = 'VCHHN' where Id = 'ID phòng khám'

update MasterDatas set DefaultValue = N'- Khỏe mạnh, trong 2 tuần qua không sốt. Các lần tiêm chủng trước bình thường. Tiêm đúng theo lứa tuổi.' where Code = 'OPDOENPMHANS'
update MasterDatas set DefaultValue = N'- Bình thường
- Sản khoa: Thai lần . Thai tuần ngày. Siêu âm thai bình thường.' where Code = 'OPDOENHPIANS'
update MasterDatas set DefaultValue = N'- Tỉnh
- Thể trạng trung bình
- Da niêm mạc hồng, không xuất huyết dưới da' where Code = 'OPDOENKTTANS'
update MasterDatas set DefaultValue = N'- Bụng mềm, không chướng, di động theo nhịp thở, gan lách không to
- Hội chứng não – màng não âm tính.
- Họng sạch, không viêm
- Tai mũi họng sạch, không viêm, amydal không to
- Cân nặng và chiều cao đạt chuẩn theo tuổi và giới, tăng trưởng tốt, cân đối
- Trẻ phát triển bình thường về tinh thần và thể chất theo độ tuổi' where Code = 'OPDOENKCKANS'
update MasterDatas set DefaultValue = N'- Lồng ngực cân đối, di động theo nhịp thở.
- Tim đều, T1 T2 rõ. Không có tiếng tim bệnh lý
- Không khó thở, không co kéo cơ hô hấp phụ
- Phổi trong không rales, rì rào phế nang rõ' where Code = 'OPDOENKTPANS'
update MasterDatas set DefaultValue = N'- Chưa phát hiện bất thường' where Code = 'OPDOENKCBPKANS'
update MasterDatas set DefaultValue = N'- Không có' where Code = 'OPDOENPT0ANS'