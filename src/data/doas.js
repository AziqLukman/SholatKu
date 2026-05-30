const doaList = [
  {
    id: 1,
    title: 'Doa Bangun Tidur',
    arabic: 'اَلْحَمْدُ لِلَّهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ',
    latin: "Alhamdu lillahil-ladzi ahyana ba'da ma amatana wa ilaihin-nusyur",
    translation: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya kami dikembalikan.',
    category: 'Pagi & Petang'
  },
  {
    id: 2,
    title: 'Doa Sebelum Tidur',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    latin: "Bismikallaahumma amuutu wa ahyaa",
    translation: 'Dengan menyebut nama-Mu ya Allah, aku hidup dan aku mati.',
    category: 'Pagi & Petang'
  },
  {
    id: 3,
    title: 'Doa Masuk Masjid',
    arabic: 'اللَّهُمَّ افْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ',
    latin: "Allaahummafftah lii abwaaba rahmatik",
    translation: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.',
    category: 'Ibadah'
  },
  {
    id: 4,
    title: 'Doa Keluar Masjid',
    arabic: 'اللَّهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ فَضْلِكَ',
    latin: "Allaahumma innii as'aluka min fadlik",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu dari karunia-Mu.',
    category: 'Ibadah'
  },
  {
    id: 5,
    title: 'Doa Sebelum Makan',
    arabic: 'بِسْمِ اللَّهِ وَبَرَكَةِ اللَّهِ',
    latin: "Bismillaahi wa barakatillaah",
    translation: 'Dengan menyebut nama Allah dan dengan berkah Allah.',
    category: 'Aktivitas'
  },
  {
    id: 6,
    title: 'Doa Sesudah Makan',
    arabic: 'اَلْحَمْدُ لِلَّهِ الَّذِيْ أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِيْنَ',
    latin: "Alhamdu lillaahil-ladzi ath'amana wa saqaana wa ja'alana minal-muslimin",
    translation: 'Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami sebagai orang-orang muslim.',
    category: 'Aktivitas'
  },
  {
    id: 7,
    title: 'Doa Masuk Kamar Mandi',
    arabic: 'اللَّهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَآئِثِ',
    latin: "Allaahumma innii a'uudzu bika minal-khubutsi wal-khabaa'its",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari kejahatan setan laki-laki dan perempuan.',
    category: 'Aktivitas'
  },
  {
    id: 8,
    title: 'Doa Keluar Kamar Mandi',
    arabic: 'غُفْرَانَكَ',
    latin: "Ghufraanak",
    translation: 'Aku memohon ampunan-Mu.',
    category: 'Aktivitas'
  },
  {
    id: 9,
    title: 'Doa Bepergian',
    arabic: 'سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُوْنَ',
    latin: "Subhaanal-ladzi sakh-khara lana haadza wa maa kunna lahu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun",
    translation: 'Maha Suci Allah yang telah menundukkan semua ini bagi kami, padahal kami sebelumnya tidak mampu menguasainya. Dan sesungguhnya kami akan kembali kepada Tuhan kami.',
    category: 'Aktivitas'
  },
  {
    id: 10,
    title: 'Doa Berkaca / Bercermin',
    arabic: 'اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِيْ فَحَسِّنْ خُلُقِيْ',
    latin: "Allaahumma anta hassanta khalqii fa-hassin khuluqii",
    translation: 'Ya Allah, Engkaulah yang telah membaguskan kejadianku, maka baguskanlah pula akhlakku.',
    category: 'Harian'
  },
  {
    id: 11,
    title: 'Doa Berpakaian',
    arabic: 'اَلْحَمْدُ لِلَّهِ الَّذِيْ كَسَانِيْ هَذَا الثَّوْبَ وَرَزَقَنِيْهِ مِنْ غَيْرِ حَوْلٍ مِنِّيْ وَلَا قُوَّةٍ',
    latin: "Alhamdu lillaahil-ladzi kasaanii haadzats-tsauba wa razaqaniihi min ghairi haulin minnii wa laa quwwah",
    translation: 'Segala puji bagi Allah yang telah memberi aku pakaian ini dan memberi rezeki kepadaku tanpa daya dan kekuatan dariku.',
    category: 'Aktivitas'
  },
  {
    id: 12,
    title: 'Doa Ketika Hujan',
    arabic: 'اللَّهُمَّ صَيِّبًا نَافِعًا',
    latin: "Allaahumma shayyiban naafi'an",
    translation: 'Ya Allah, turunkanlah hujan yang bermanfaat.',
    category: 'Harian'
  },
  {
    id: 13,
    title: 'Doa Setelah Adzan',
    arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
    latin: "Allaahumma rabba haadzihid-da'watit-taammah, wash-shalaatil-qaa'imah, aati Muhammadanil-wasiilata wal-fadhiilah, wab'atshu maqaamam-mahmuudanil-ladzi wa'adtah",
    translation: 'Ya Allah, Tuhan pemilik seruan yang sempurna ini dan sholat yang akan ditegakkan, berikanlah kepada Muhammad wasilah dan keutamaan, dan bangkitkanlah beliau ke tempat yang terpuji yang telah Engkau janjikan.',
    category: 'Ibadah'
  },
  {
    id: 14,
    title: 'Doa Kedua Orang Tua',
    arabic: 'رَبِّ اغْفِرْ لِيْ وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرًا',
    latin: "Rabbighfir lii wa liwaalidayya warhamhumaa kamaa rabbayaanii shaghiira",
    translation: 'Ya Tuhanku, ampunilah aku dan kedua ibu bapakku, sayangilah mereka sebagaimana mereka telah menyayangiku di waktu kecil.',
    category: 'Keluarga'
  },
  {
    id: 15,
    title: 'Doa Kebaikan Dunia Akhirat',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: "Rabbanaa aatinaa fid-dunyaa hasanah wa fil-aakhirati hasanah wa qinaa 'adzaaban-naar",
    translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari siksa api neraka.',
    category: 'Utama'
  },
  {
    id: 16,
    title: 'Doa Sebelum Wudhu',
    arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ',
    latin: "Bismillaahirrahmaanirrahiim",
    translation: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.',
    category: 'Ibadah'
  },
  {
    id: 17,
    title: 'Doa Setelah Wudhu',
    arabic: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ، اَللّٰهُمَّ اجْعَلْنِيْ مِنَ التَّوَّابِيْنَ وَاجْعَلْنِيْ مِنَ الْمُتَطَهِّرِيْنَ',
    latin: "Asyhadu allaa ilaaha illallaahu wahdahu laa syariika lahu, wa asyhadu anna Muhammadan 'abduhuu wa rasuuluh. Allaahummaj'alnii minat-tawwaabiina waj'alnii minal-mutathahiriin",
    translation: 'Aku bersaksi bahwa tiada Tuhan selain Allah yang Maha Esa, tiada sekutu bagi-Nya, dan aku bersaksi bahwa Muhammad adalah hamba-Nya dan utusan-Nya. Ya Allah, jadikanlah aku termasuk golongan orang-orang yang bertobat dan jadikanlah aku termasuk golongan orang-orang yang bersuci.',
    category: 'Ibadah'
  },
  {
    id: 18,
    title: 'Doa Keluar Rumah',
    arabic: 'بِسْمِ اللّٰهِ تَوَكَّلْتُ عَلَى اللّٰهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ',
    latin: "Bismillaahi tawakkaltu 'alallaah, laa haula wa laa quwwata illaa billaah",
    translation: 'Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah.',
    category: 'Aktivitas'
  },
  {
    id: 19,
    title: 'Doa Masuk Rumah',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ، بِسْمِ اللّٰهِ وَلَجْنَا، وَبِسْمِ اللّٰهِ خَرَجْنَا، وَعَلَى اللّٰهِ رَبِّنَا تَوَكَّلْنَا',
    latin: "Allaahumma innii as'aluka khairal-maulaji wa khairal-makhraji, bismillaahi walajnaa, wa bismillaahi kharajnaa, wa 'alallaahi rabbinaa tawakkalnaa",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan tempat masuk dan kebaikan tempat keluar. Dengan menyebut nama Allah kami masuk, dan dengan menyebut nama Allah kami keluar, dan kepada Allah Tuhan kami, kami bertawakal.',
    category: 'Aktivitas'
  },
  {
    id: 20,
    title: 'Doa Sebelum Belajar',
    arabic: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
    latin: "Rabbi zidnii 'ilman warzuqnii fahmaa",
    translation: 'Ya Tuhanku, tambahkanlah kepadaku ilmu dan berilah aku karunia untuk memahaminya.',
    category: 'Harian'
  },
  {
    id: 21,
    title: 'Doa Sesudah Belajar',
    arabic: 'اَللّٰهُمَّ أَرِنَا الْحَقَّ حَقًّا وَارْزُقْنَا اتِّبَاعَهُ، وَأَرِنَا الْبَاطِلَ بَاطِلًا وَارْزُقْنَا اجْتِنَابَهُ',
    latin: "Allaahumma arinal-haqqa haqqan warzuqnat-tibaa'ah, wa arinal-baathila baathilan warzuqnaj-tinaabah",
    translation: 'Ya Allah, tunjukkanlah kepada kami yang benar itu adalah benar dan berikanlah kami kekuatan untuk mengikutinya, serta tunjukkanlah kepada kami yang salah itu adalah salah dan berikanlah kami kekuatan untuk menjauhinya.',
    category: 'Harian'
  },
  {
    id: 22,
    title: 'Doa Sebelum Bekerja',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ فَضْلِكَ وَعَطَائِكَ رِزْقًا طَيِّبًا مُبَارَكًا',
    latin: "Allaahumma innii as'aluka min fadhlika wa 'athaa'ika rizqan thayyiban mubaarakan",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu dari karunia dan pemberian-Mu, rezeki yang baik dan penuh berkah.',
    category: 'Harian'
  },
  {
    id: 23,
    title: 'Doa Ketika Menjenguk Orang Sakit',
    arabic: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِ أَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا',
    latin: "Allaahumma rabban-naasi adzhibil-ba'sa isyfi antasy-syaafii laa syifaa'a illaa syifaa'uka syifaa'an laa yughaadiru saqamaa",
    translation: 'Ya Allah, Tuhan pemelihara manusia, hilangkanlah penyakit ini dan sembuhkanlah, Engkaulah Yang Maha Menyembuhkan, tidak ada kesembuhan melainkan kesembuhan-Mu, kesembuhan yang tidak meninggalkan penyakit sedikit pun.',
    category: 'Keluarga'
  },
  {
    id: 24,
    title: 'Doa Ketika Tertimpa Musibah',
    arabic: 'إِنَّا لِلّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُوْنَ، اَللّٰهُمَّ أْجُرْنِيْ فِيْ مُصِيْبَتِيْ وَأَخْلِفْ لِيْ خَيْرًا مِنْهَا',
    latin: "Innaa lillaahi wa innaa ilaihi raaji'uun. Allaahumma'jurnii fii mushiibatii wa akhlif lii khairan minhaa",
    translation: 'Sesungguhnya kami adalah milik Allah dan sesungguhnya hanya kepada-Nya kami akan kembali. Ya Allah, berilah aku pahala atas musibah yang menimpaku ini, dan berilah aku ganti yang lebih baik daripadanya.',
    category: 'Utama'
  },
  {
    id: 25,
    title: 'Doa Penenang Hati (Mengatasi Gelisah & Sedih)',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوْذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوْذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوْذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
    latin: "Allaahumma innii a'uudzu bika minal-hammi wal-hazani, wa a'uudzu bika minal-'ajzi wal-kasali, wa a'uudzu bika minal-jubni wal-bukhli, wa a'uudzu bika min ghalabatid-daini wa qahrir-rijaal",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari rasa sedih dan gelisah, aku berlindung kepada-Mu dari sifat lemah dan malas, aku berlindung kepada-Mu dari sifat penakut dan kikir, dan aku berlindung kepada-Mu dari lilitan utang serta kesewenang-wenangan manusia.',
    category: 'Utama'
  },
  {
    id: 26,
    title: 'Doa Mohon Ampunan Dosa (Sayyidul Istighfar)',
    arabic: 'اَللَّهُمَّ أَنْتَ رَبِّيْ لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ',
    latin: "Allaahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastatha'tu. A'uudzu bika min syarri maa shana'tu, abuu'u laka bini'matika 'alayya, wa abuu'u bidzanbii faghfirlii fa-innahu laa yaghfirudz-dzunuuba illaa anta",
    translation: 'Ya Allah, Engkau adalah Tuhanku, tiada Tuhan selain Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu. Aku berada di atas janji dan komitmen-Mu semampuku. Aku berlindung kepada-Mu dari keburukan apa yang telah kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku. Sesungguhnya tiada yang dapat mengampuni dosa-dosa selain Engkau.',
    category: 'Utama'
  },
  {
    id: 27,
    title: 'Doa Ketika Mendengar Petir',
    arabic: 'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ',
    latin: "Subhaanal-ladzi yusabbihur-ra'du bihamdihii wal-malaa'ikatu min khiifatih",
    translation: 'Maha Suci Allah yang petir bertasbih dengan memuji-Nya, begitu juga para malaikat karena takut kepada-Nya.',
    category: 'Alam'
  },
  {
    id: 28,
    title: 'Doa Ketika Ada Angin Kencang',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيْهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ، وَأَعُوْذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيْهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ',
    latin: "Allaahumma innii as'aluka khairahaa wa khaira maa fiihaa wa khaira maa ursilat bih, wa a'uudzu bika min syarrihaa wa syarri maa fiihaa wa syarri maa ursilat bih",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan angin ini, kebaikan apa yang ada di dalamnya, dan kebaikan apa yang dibawanya. Dan aku berlindung kepada-Mu dari keburukan angin ini, keburukan apa yang ada di dalamnya, dan keburukan apa yang dibawanya.',
    category: 'Alam'
  },
  {
    id: 29,
    title: 'Doa Pagi Hari (Menjelang Subuh)',
    arabic: 'اَللّٰهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوْتُ وَإِلَيْكَ النُّشُوْرُ',
    latin: "Allaahumma bika ashbahnaa wa bika amsainaa wa bika nahyaa wa bika namuutu wa ilaihinnusyuur",
    translation: 'Ya Allah, dengan-Mu kami memasuki pagi hari, dengan-Mu kami memasuki sore hari, dengan-Mu kami hidup, dengan-Mu kami mati, dan hanya kepada-Mu kami akan kembali.',
    category: 'Pagi & Petang'
  },
  {
    id: 30,
    title: 'Doa Sore Hari (Menjelang Malam)',
    arabic: 'اَللّٰهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوْتُ وَإِلَيْكَ الْمَصِيْرُ',
    latin: "Allaahumma bika amsainaa wa bika ashbahnaa wa bika nahyaa wa bika namuutu wa ilaihilmashiir",
    translation: 'Ya Allah, dengan-Mu kami memasuki sore hari, dengan-Mu kami memasuki pagi hari, dengan-Mu kami hidup, dengan-Mu kami mati, dan hanya kepada-Mu tempat kembali.',
    category: 'Pagi & Petang'
  },
  {
    id: 31,
    title: 'Doa Sebelum Bersetubuh (Suami Istri)',
    arabic: 'بِسْمِ اللّٰهِ اَللّٰهُمَّ جَنِّبْنَا الشَّيْطَانَ وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا',
    latin: "Bismillaah, Allaahumma jannibnasy-syaitaana wa jannibisy-syaitaana maa razaqtanaa",
    translation: 'Dengan menyebut nama Allah. Ya Allah, jauhkanlah kami dari setan dan jauhkanlah setan dari rezeki (anak) yang Engkau anugerahkan kepada kami.',
    category: 'Keluarga'
  },
  {
    id: 32,
    title: 'Doa Memohon Keturunan Saleh',
    arabic: 'رَبِّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ',
    latin: "Rabbi hab lii min ladunka dzurriyyatan thayyibah, innaka samii'ud-du'aa'",
    translation: 'Ya Tuhanku, berilah aku dari sisi-Mu seorang anak yang baik. Sesungguhnya Engkau Maha Pendengar doa.',
    category: 'Keluarga'
  },
  {
    id: 33,
    title: 'Doa Ketika Menghadapi Kesulitan',
    arabic: 'اَللّٰهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
    latin: "Allaahumma laa sahla illaa maa ja'altahu sahlaa, wa anta taj'alul-hazna idzaa syi'ta sahlaa",
    translation: 'Ya Allah, tidak ada kemudahan kecuali apa yang Engkau jadikan mudah, dan Engkau dapat menjadikan kesedihan/kesulitan menjadi mudah jika Engkau menghendaki.',
    category: 'Utama'
  },
  {
    id: 34,
    title: 'Doa Ketika Bersin',
    arabic: 'اَلْحَمْدُ لِلّٰهِ',
    latin: "Alhamdulillaah",
    translation: 'Segala puji bagi Allah.',
    category: 'Harian'
  },
  {
    id: 35,
    title: 'Doa Mendengar Orang Bersin',
    arabic: 'يَرْحَمُكَ اللّٰهُ',
    latin: "Yarhamukallaah",
    translation: 'Semoga Allah melimpahkan rahmat-Nya kepadamu.',
    category: 'Harian'
  },
  {
    id: 36,
    title: 'Doa Jawaban Setelah Didoakan Saat Bersin',
    arabic: 'يَهْدِيْكُمُ اللّٰهُ وَيُصْلِحُ بَالَكُمْ',
    latin: "Yahdiikumullaahu wa yushlihu baalakum",
    translation: 'Semoga Allah memberimu petunjuk dan memperbaiki keadaanmu.',
    category: 'Harian'
  },
  {
    id: 37,
    title: 'Doa Masuk Pasar / Keramaian',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu, yuhyii wa yumiitu, wa huwa hayyun laa yamuutu, biyadihil-khairu, wa huwa 'alaa kulli syai'in qadiir",
    translation: 'Tiada Tuhan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala puji. Dia yang menghidupkan dan yang mematikan, dan Dia Maha Hidup, tidak mati. Di tangan-Nya segala kebaikan, dan Dia Maha Kuasa atas segala sesuatu.',
    category: 'Aktivitas'
  },
  {
    id: 38,
    title: 'Doa Keteguhan Iman',
    arabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
    latin: "Yaa muqallibal-quluubi tsabbit qalbii 'alaa diinik",
    translation: 'Wahai Dzat yang membolak-balikkan hati, teguhkanlah hatiku di atas agama-Mu.',
    category: 'Utama'
  },
  {
    id: 39,
    title: 'Doa Perlindungan dari Kejahatan Makhluk',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    latin: "A'uudzu bikalimaatillaahit-taammaati min syarri maa khalaq",
    translation: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang diciptakan-Nya.',
    category: 'Utama'
  },
  {
    id: 40,
    title: 'Doa Terhindar dari Utang dan Kesusahan',
    arabic: 'اَللّٰهُمَّ اكْفِنِيْ بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِيْ بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    latin: "Allaahumma-kfinii bi-halaalika 'an haraamika wa aghninii bi-fadhlika 'amman siwaaka",
    translation: 'Ya Allah, cukupkanlah aku dengan rezeki-Mu yang halal hingga aku terhindar dari yang haram, dan perkayalah aku dengan karunia-Mu sehingga aku tidak bergantung kepada selain-Mu.',
    category: 'Utama'
  },
  {
    id: 41,
    title: 'Doa Naik Kendaraan',
    arabic: 'بِسْمِ اللّٰهِ وَالْحَمْدُ لِلّٰهِ، سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هٰذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُوْنَ',
    latin: "Bismillaahi wal-hamdulillaah. Subhaanal-ladzi sakh-khara lanaa haadza wa maa kunnaa lahu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun",
    translation: 'Dengan nama Allah dan segala puji bagi Allah. Maha Suci Dzat yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya. Dan sesungguhnya kami akan kembali kepada Tuhan kami.',
    category: 'Aktivitas'
  },
  {
    id: 42,
    title: 'Doa Ketika Melihat Bulan Sabit (Hilal)',
    arabic: 'اللّٰهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيْمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ وَالتَّوْفِيْقِ لِمَا تُحِبُّ وَتَرْضَى، رَبُّنَا وَرَبُّكَ اللّٰهُ',
    latin: "Allaahumma ahillahu 'alainaa bil-amni wal-iimaani was-salaamati wal-islaami wat-taufiiqi limaa tuhibbu wa tardhaa. Rabbunaa wa rabbukallaah",
    translation: 'Ya Allah, tampakkanlah bulan sabit itu kepada kami dengan membawa keamanan, keimanan, keselamatan, dan Islam, serta taufik untuk apa yang Engkau cintai dan ridhai. Tuhan kami dan Tuhanmu adalah Allah.',
    category: 'Alam'
  },
  {
    id: 43,
    title: 'Doa Ketika Gempa Bumi',
    arabic: 'اَللّٰهُمَّ اصْرِفْ عَنَّا بَلَاءَكَ وَعَذَابَكَ',
    latin: "Allaahummashrif 'annaa balaa'aka wa 'adzaabak",
    translation: 'Ya Allah, palingkanlah dari kami bala dan azab-Mu.',
    category: 'Alam'
  },
  {
    id: 44,
    title: 'Doa Minum Susu',
    arabic: 'اَللّٰهُمَّ بَارِكْ لَنَا فِيْهِ وَزِدْنَا مِنْهُ',
    latin: "Allaahumma baarik lanaa fiihi wa zidnaa minhu",
    translation: 'Ya Allah, berkahilah kami padanya dan tambahkanlah bagi kami daripadanya.',
    category: 'Aktivitas'
  },
  {
    id: 45,
    title: 'Doa Lupa Baca Bismillah Sebelum Makan',
    arabic: 'بِسْمِ اللّٰهِ أَوَّلَهُ وَآخِرَهُ',
    latin: "Bismillaahi awwalahu wa aakhirah",
    translation: 'Dengan nama Allah pada awalnya dan pada akhirnya.',
    category: 'Aktivitas'
  },
  {
    id: 46,
    title: 'Doa Ketika Makan di Rumah Orang',
    arabic: 'اَللّٰهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِيْ وَاسْقِ مَنْ سَقَانِيْ',
    latin: "Allaahumma ath'im man ath'amanii wasqi man saqaanii",
    translation: 'Ya Allah, berilah makan orang yang telah memberiku makan, dan berilah minum orang yang telah memberiku minum.',
    category: 'Aktivitas'
  },
  {
    id: 47,
    title: 'Doa Berbuka Puasa',
    arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللّٰهُ',
    latin: "Dzahabazh-zhama'u wabtallatil-'uruuqu wa tsabatal-ajru insyaa-allaah",
    translation: 'Telah hilang dahaga, urat-urat telah basah, dan pahala telah ditetapkan, insya Allah.',
    category: 'Ibadah'
  },
  {
    id: 48,
    title: 'Doa Niat Puasa Ramadhan',
    arabic: 'نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هٰذِهِ السَّنَةِ لِلّٰهِ تَعَالَى',
    latin: "Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhana haadzihis-sanati lillaahi ta'aalaa",
    translation: 'Aku berniat puasa esok hari untuk menunaikan kewajiban bulan Ramadhan tahun ini karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 49,
    title: 'Doa Malam Lailatul Qadr',
    arabic: 'اَللّٰهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّيْ',
    latin: "Allaahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'annii",
    translation: 'Ya Allah, sesungguhnya Engkau Maha Pemaaf dan menyukai pemberian maaf, maka maafkanlah aku.',
    category: 'Ibadah'
  },
  {
    id: 50,
    title: 'Doa Sujud Tilawah',
    arabic: 'سَجَدَ وَجْهِيَ لِلَّذِيْ خَلَقَهُ وَصَوَّرَهُ وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ فَتَبَارَكَ اللّٰهُ أَحْسَنُ الْخَالِقِيْنَ',
    latin: "Sajada wajhiya lilladzii khalaqahu wa shawwarahu wa syaqqa sam'ahu wa basharahu bihaulihii wa quwwatih. Fatabaarakallaahu ahsanul-khaaliqiin",
    translation: 'Wajahku bersujud kepada Dzat yang menciptakannya, membentuknya, membukakan pendengaran dan penglihatannya dengan daya dan kekuatan-Nya. Maha Suci Allah, sebaik-baik Pencipta.',
    category: 'Ibadah'
  },
  {
    id: 51,
    title: 'Doa Iftitah (Pembuka Sholat)',
    arabic: 'وَجَّهْتُ وَجْهِيَ لِلَّذِيْ فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيْفًا مُسْلِمًا وَمَا أَنَا مِنَ الْمُشْرِكِيْنَ. إِنَّ صَلَاتِيْ وَنُسُكِيْ وَمَحْيَايَ وَمَمَاتِيْ لِلّٰهِ رَبِّ الْعَالَمِيْنَ',
    latin: "Wajjahtu wajhiya lilladzii fatharas-samaawaati wal-ardha haniifan musliman wa maa ana minal-musyrikiin. Inna shalaatii wa nusukii wa mahyaaya wa mamaatii lillaahi rabbil-'aalamiin",
    translation: 'Aku hadapkan wajahku kepada Dzat yang menciptakan langit dan bumi dengan penuh ketulusan dan aku bukanlah termasuk orang-orang yang mempersekutukan-Nya. Sesungguhnya sholatku, ibadahku, hidupku, dan matiku hanya untuk Allah, Tuhan semesta alam.',
    category: 'Ibadah'
  },
  {
    id: 52,
    title: 'Doa Qunut (Sholat Subuh)',
    arabic: 'اَللّٰهُمَّ اهْدِنِيْ فِيْمَنْ هَدَيْتَ وَعَافِنِيْ فِيْمَنْ عَافَيْتَ وَتَوَلَّنِيْ فِيْمَنْ تَوَلَّيْتَ وَبَارِكْ لِيْ فِيْمَا أَعْطَيْتَ وَقِنِيْ شَرَّ مَا قَضَيْتَ فَإِنَّكَ تَقْضِيْ وَلَا يُقْضَى عَلَيْكَ وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',
    latin: "Allaahummahdinii fiiman hadait, wa 'aafinii fiiman 'aafait, wa tawallanii fiiman tawallait, wa baarik lii fiimaa a'thait, wa qinii syarra maa qadhait, fa-innaka taqdhii wa laa yuqdhaa 'alaik, wa innahu laa yadzillu man waalait, tabaarakta rabbanaa wa ta'aalait",
    translation: 'Ya Allah, tunjukilah aku sebagaimana orang yang telah Engkau tunjuki, dan berilah aku kesehatan sebagaimana orang yang telah Engkau beri kesehatan, dan peliharalah aku sebagaimana orang yang telah Engkau pelihara, dan berikanlah berkah pada apa yang telah Engkau berikan, dan lindungilah aku dari keburukan yang telah Engkau tentukan, karena sesungguhnya Engkau yang menentukan dan tidak ada yang menghukum-Mu, dan sungguh tidak hina orang yang Engkau lindungi. Maha Suci Engkau, Tuhan kami dan Maha Tinggi.',
    category: 'Ibadah'
  },
  {
    id: 53,
    title: 'Doa Tasyahud Akhir (Tahiyyat)',
    arabic: 'اَلتَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلّٰهِ، اَلسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ، اَلسَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللّٰهِ الصَّالِحِيْنَ',
    latin: "At-tahiyyaatul-mubaarakaatush-shalawaatuth-thayyibaatu lillaah. As-salaamu 'alaika ayyuhan-nabiyyu wa rahmatullaahi wa barakaatuh. As-salaamu 'alainaa wa 'alaa 'ibaadillaahish-shaalihiin",
    translation: 'Segala penghormatan, keberkahan, sholawat, dan kebaikan hanya milik Allah. Semoga keselamatan tercurah kepadamu wahai Nabi, demikian pula rahmat dan berkah-Nya. Semoga keselamatan tercurah kepada kami dan kepada hamba-hamba Allah yang saleh.',
    category: 'Ibadah'
  },
  {
    id: 54,
    title: 'Doa Setelah Sholat Fardhu',
    arabic: 'أَسْتَغْفِرُ اللّٰهَ الْعَظِيْمَ، أَسْتَغْفِرُ اللّٰهَ الْعَظِيْمَ، أَسْتَغْفِرُ اللّٰهَ الْعَظِيْمَ. اَللّٰهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    latin: "Astaghfirullaahal-'azhiim (3x). Allaahumma antas-salaamu wa minkas-salaamu tabaarakta yaa dzal-jalaali wal-ikraam",
    translation: 'Aku memohon ampun kepada Allah Yang Maha Agung (3x). Ya Allah, Engkau Maha Pemberi keselamatan, dan dari-Mu keselamatan. Maha Suci Engkau wahai Pemilik keagungan dan kemuliaan.',
    category: 'Ibadah'
  },
  {
    id: 55,
    title: 'Doa Sholat Dhuha',
    arabic: 'اَللّٰهُمَّ إِنَّ الضُّحَاءَ ضُحَاؤُكَ وَالْبَهَاءَ بَهَاؤُكَ وَالْجَمَالَ جَمَالُكَ وَالْقُوَّةَ قُوَّتُكَ وَالْقُدْرَةَ قُدْرَتُكَ وَالْعِصْمَةَ عِصْمَتُكَ',
    latin: "Allaahumma innadh-dhuhaa'a dhuhaa'uka wal-bahaa'a bahaa'uka wal-jamaala jamaaluka wal-quwwata quwwatuka wal-qudrata qudratuka wal-'ishmata 'ishmatuk",
    translation: 'Ya Allah, sesungguhnya waktu dhuha itu adalah waktu dhuha-Mu, keagungan itu adalah keagungan-Mu, keindahan itu adalah keindahan-Mu, kekuatan itu adalah kekuatan-Mu, kekuasaan itu adalah kekuasaan-Mu, dan perlindungan itu adalah perlindungan-Mu.',
    category: 'Ibadah'
  },
  {
    id: 56,
    title: 'Doa Sholat Tahajud',
    arabic: 'اَللّٰهُمَّ لَكَ الْحَمْدُ أَنْتَ نُوْرُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيْهِنَّ، وَلَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيْهِنَّ، وَلَكَ الْحَمْدُ أَنْتَ الْحَقُّ',
    latin: "Allaahumma lakal-hamdu anta nuurrus-samaawaati wal-ardhi wa man fiihinna, wa lakal-hamdu anta qayyimus-samaawaati wal-ardhi wa man fiihinna, wa lakal-hamdu antal-haqq",
    translation: 'Ya Allah, segala puji bagi-Mu. Engkau cahaya langit dan bumi serta siapa yang ada di dalamnya. Segala puji bagi-Mu, Engkau penegak langit dan bumi serta siapa yang ada di dalamnya. Segala puji bagi-Mu, Engkau Maha Benar.',
    category: 'Ibadah'
  },
  {
    id: 57,
    title: 'Doa Sholat Istikharah',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْتَخِيْرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيْمِ فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ وَتَعْلَمُ وَلَا أَعْلَمُ وَأَنْتَ عَلَّامُ الْغُيُوْبِ',
    latin: "Allaahumma innii astakhiiruka bi'ilmika wa astaqdiruka biqudratika wa as'aluka min fadlikal-'azhiim, fa-innaka taqdiru wa laa aqdiru wa ta'lamu wa laa a'lamu wa anta 'allaamul-ghuyuub",
    translation: 'Ya Allah, sesungguhnya aku memohon pilihan yang terbaik kepada-Mu dengan ilmu-Mu, dan aku memohon kekuatan dengan kekuasaan-Mu, dan aku memohon kepada-Mu dari karunia-Mu yang agung. Sesungguhnya Engkau Maha Kuasa dan aku tidak kuasa. Engkau Maha Mengetahui dan aku tidak mengetahui, dan Engkau Maha Mengetahui perkara gaib.',
    category: 'Ibadah'
  },
  {
    id: 58,
    title: 'Doa Sebelum Membaca Al-Quran',
    arabic: 'اَللّٰهُمَّ افْتَحْ عَلَيْنَا حِكْمَتَكَ وَانْشُرْ عَلَيْنَا رَحْمَتَكَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    latin: "Allaahummaftah 'alainaa hikmataka wansyur 'alainaa rahmataka yaa dzal-jalaali wal-ikraam",
    translation: 'Ya Allah, bukalah hikmah-Mu kepada kami dan curahkanlah kepada kami rahmat-Mu, wahai Pemilik keagungan dan kemuliaan.',
    category: 'Ibadah'
  },
  {
    id: 59,
    title: 'Doa Sesudah Membaca Al-Quran',
    arabic: 'صَدَقَ اللّٰهُ الْعَظِيْمُ وَصَدَقَ رَسُوْلُهُ النَّبِيُّ الْكَرِيْمُ وَنَحْنُ عَلَى ذٰلِكَ مِنَ الشَّاهِدِيْنَ وَالشَّاكِرِيْنَ',
    latin: "Shadaqallaahul-'azhiimu wa shadaqa rasuuluhun-nabiyyul-kariimu wa nahnu 'alaa dzaalika minasy-syaahidiina wasy-syaakiriin",
    translation: 'Maha Benar Allah Yang Maha Agung, dan benar Rasul-Nya, Nabi yang mulia. Kami atas hal itu termasuk orang-orang yang bersaksi dan bersyukur.',
    category: 'Ibadah'
  },
  {
    id: 60,
    title: 'Doa Untuk Orang yang Baru Meninggal',
    arabic: 'اَللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مُدْخَلَهُ',
    latin: "Allaahummagh-fir lahu warhamhu wa 'aafihi wa'fu 'anhu wa akrim nuzulahu wa wassi' mudkhalah",
    translation: 'Ya Allah, ampunilah dia, rahmatilah dia, berilah dia keselamatan dan maafkanlah dia, muliakanlah tempat tinggalnya dan luaskanlah tempat masuknya.',
    category: 'Keluarga'
  },
  {
    id: 61,
    title: 'Doa Ziarah Kubur',
    arabic: 'اَلسَّلَامُ عَلَيْكُمْ يَا أَهْلَ الْقُبُوْرِ يَغْفِرُ اللّٰهُ لَنَا وَلَكُمْ أَنْتُمْ سَلَفُنَا وَنَحْنُ بِالْأَثَرِ',
    latin: "As-salaamu 'alaikum yaa ahlal-qubuuri yaghfirullaahu lanaa wa lakum, antum salafunaa wa nahnu bil-atsar",
    translation: 'Keselamatan atas kalian wahai penghuni kubur, semoga Allah mengampuni kami dan kalian. Kalian telah mendahului kami, dan kami akan menyusul.',
    category: 'Keluarga'
  },
  {
    id: 62,
    title: 'Doa Saat Ditimpa Rasa Takut',
    arabic: 'اَللّٰهُمَّ إِنَّا نَجْعَلُكَ فِيْ نُحُوْرِهِمْ وَنَعُوْذُ بِكَ مِنْ شُرُوْرِهِمْ',
    latin: "Allaahumma innaa naj'aluka fii nuhuurihim wa na'uudzu bika min syuruurihim",
    translation: 'Ya Allah, sesungguhnya kami menjadikan-Mu sebagai tameng terhadap mereka dan kami berlindung kepada-Mu dari kejahatan mereka.',
    category: 'Utama'
  },
  {
    id: 63,
    title: 'Doa Ketika Marah',
    arabic: 'أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ',
    latin: "A'uudzu billaahi minasy-syaithaanir-rajiim",
    translation: 'Aku berlindung kepada Allah dari godaan setan yang terkutuk.',
    category: 'Harian'
  },
  {
    id: 64,
    title: 'Doa Ketika Mimpi Buruk',
    arabic: 'أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ وَشَرِّ عِبَادِهِ وَمِنْ هَمَزَاتِ الشَّيَاطِيْنِ وَأَنْ يَحْضُرُوْنِ',
    latin: "A'uudzu bikalimaatillaahit-taammaati min ghadhabihii wa 'iqaabihii wa syarri 'ibaadihii wa min hamazaatisy-syayaathiini wa an yahdhuruun",
    translation: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari murka-Nya, siksa-Nya, kejahatan hamba-hamba-Nya, dan dari bisikan setan serta kedatangan mereka.',
    category: 'Pagi & Petang'
  },
  {
    id: 65,
    title: 'Doa Ketika Kagum / Takjub Pada Sesuatu',
    arabic: 'مَا شَاءَ اللّٰهُ لَا قُوَّةَ إِلَّا بِاللّٰهِ',
    latin: "Maa syaa-allaah, laa quwwata illaa billaah",
    translation: 'Atas kehendak Allah, tiada kekuatan kecuali dengan pertolongan Allah.',
    category: 'Harian'
  },
  {
    id: 66,
    title: 'Doa Memohon Ilmu yang Bermanfaat',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا',
    latin: "Allaahumma innii as'aluka 'ilman naafi'an wa rizqan thayyiban wa 'amalan mutaqabbalaa",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima.',
    category: 'Harian'
  },
  {
    id: 67,
    title: 'Doa Ketika Mendengar Kabar Baik',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ',
    latin: "Alhamdulillaahil-ladzii bini'matihii tatimmus-shaalihaat",
    translation: 'Segala puji bagi Allah yang dengan nikmat-Nya segala kebaikan menjadi sempurna.',
    category: 'Harian'
  },
  {
    id: 68,
    title: 'Doa Ketika Mendengar Kabar Buruk',
    arabic: 'اَلْحَمْدُ لِلّٰهِ عَلَى كُلِّ حَالٍ',
    latin: "Alhamdulillaahi 'alaa kulli haal",
    translation: 'Segala puji bagi Allah dalam setiap keadaan.',
    category: 'Harian'
  },
  {
    id: 69,
    title: 'Doa Melepas Pakaian',
    arabic: 'بِسْمِ اللّٰهِ الَّذِيْ لَا إِلٰهَ إِلَّا هُوَ',
    latin: "Bismillaahil-ladzii laa ilaaha illaa huwa",
    translation: 'Dengan nama Allah yang tiada Tuhan selain Dia.',
    category: 'Harian'
  },
  {
    id: 70,
    title: 'Doa Memohon Husnul Khatimah',
    arabic: 'اَللّٰهُمَّ اجْعَلْ خَيْرَ عُمْرِيْ آخِرَهُ وَخَيْرَ عَمَلِيْ خَوَاتِمَهُ وَخَيْرَ أَيَّامِيْ يَوْمَ أَلْقَاكَ',
    latin: "Allaahummaj'al khaira 'umrii aakhirahuu wa khaira 'amalii khawaatimahuu wa khaira ayyaamii yauma alqaak",
    translation: 'Ya Allah, jadikanlah sebaik-baik umurku adalah di akhirnya, sebaik-baik amalku adalah penutupnya, dan sebaik-baik hari-hariku adalah hari aku berjumpa dengan-Mu.',
    category: 'Utama'
  },
  {
    id: 71,
    title: 'Doa Memohon Surga & Perlindungan dari Neraka',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْجَنَّةَ وَأَعُوْذُ بِكَ مِنَ النَّارِ',
    latin: "Allaahumma innii as'alukal-jannata wa a'uudzu bika minan-naar",
    translation: 'Ya Allah, sesungguhnya aku memohon surga kepada-Mu dan aku berlindung kepada-Mu dari api neraka.',
    category: 'Utama'
  },
  {
    id: 72,
    title: 'Doa Pelindung dari Sihir dan Hasad',
    arabic: 'قُلْ أَعُوْذُ بِرَبِّ الْفَلَقِ مِنْ شَرِّ مَا خَلَقَ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    latin: "Qul a'uudzu birabbil-falaq, min syarri maa khalaq, wa min syarri ghaasiqin idzaa waqab, wa min syarrin-naffaatsaati fil-'uqad, wa min syarri haasidin idzaa hasad",
    translation: 'Katakanlah: "Aku berlindung kepada Tuhan yang menguasai subuh, dari kejahatan makhluk-Nya, dari kejahatan malam apabila telah gelap gulita, dari kejahatan wanita-wanita tukang sihir yang menghembus pada buhul-buhul, dan dari kejahatan orang yang dengki apabila ia dengki."',
    category: 'Pagi & Petang'
  },
  {
    id: 73,
    title: 'Doa Perlindungan (Surah An-Nas)',
    arabic: 'قُلْ أَعُوْذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلٰهِ النَّاسِ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ',
    latin: "Qul a'uudzu birabbin-naas, malikin-naas, ilaahin-naas, min syarril-waswaasil-khannaas, alladzii yuwaswisu fii shuduurin-naas, minal-jinnati wan-naas",
    translation: 'Katakanlah: "Aku berlindung kepada Tuhan manusia, Raja manusia, Tuhan manusia, dari kejahatan bisikan setan yang bersembunyi, yang membisikkan ke dalam dada manusia, dari golongan jin dan manusia."',
    category: 'Pagi & Petang'
  },
  {
    id: 74,
    title: 'Doa Ketika Melihat Orang Tertimpa Musibah',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ عَافَانِيْ مِمَّا ابْتَلَاكَ بِهِ وَفَضَّلَنِيْ عَلَى كَثِيْرٍ مِمَّنْ خَلَقَ تَفْضِيْلًا',
    latin: "Alhamdulillaahil-ladzii 'aafaanii mimmab-talaaka bihii wa fadhdhalnii 'alaa katsiirin mimman khalaqa tafdzhiilaa",
    translation: 'Segala puji bagi Allah yang telah menyelamatkan aku dari apa yang Dia timpakan kepadamu dan telah mengutamakan aku atas kebanyakan makhluk yang Dia ciptakan.',
    category: 'Harian'
  },
  {
    id: 75,
    title: 'Doa Untuk Anak yang Baru Lahir (Tahnik)',
    arabic: 'بَارَكَ اللّٰهُ لَكَ فِيْ الْمَوْهُوْبِ لَكَ وَشَكَرْتَ الْوَاهِبَ وَبَلَغَ أَشُدَّهُ وَرُزِقْتَ بِرَّهُ',
    latin: "Baarakallaahu laka fil-mauhuubi laka wa syakartl-waahiba wa balagha asyuddahu wa ruziqta birrah",
    translation: 'Semoga Allah memberkahi anak yang dianugerahkan kepadamu, semoga kamu bersyukur kepada Yang Memberi, semoga anak itu tumbuh dewasa, dan semoga kamu diberi kebaktiannya.',
    category: 'Keluarga'
  },
  {
    id: 76,
    title: 'Doa Untuk Pengantin Baru',
    arabic: 'بَارَكَ اللّٰهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِيْ خَيْرٍ',
    latin: "Baarakallaahu laka wa baaraka 'alaika wa jama'a bainakumaa fii khair",
    translation: 'Semoga Allah memberkahimu dan mencurahkan berkah atasmu, serta menyatukan kalian berdua dalam kebaikan.',
    category: 'Keluarga'
  },
  {
    id: 77,
    title: 'Doa Ketika Hujan Lebat (Khawatir Banjir)',
    arabic: 'اَللّٰهُمَّ حَوَالَيْنَا وَلَا عَلَيْنَا، اَللّٰهُمَّ عَلَى الْآكَامِ وَالظِّرَابِ وَبُطُوْنِ الْأَوْدِيَةِ وَمَنَابِتِ الشَّجَرِ',
    latin: "Allaahumma hawaalainaa wa laa 'alainaa. Allaahumma 'alal-aakaami wazh-zhiraabi wa buthuunil-audiyati wa manaabitis-syajar",
    translation: 'Ya Allah, turunkanlah hujan di sekitar kami, jangan atas kami. Ya Allah, turunkanlah di bukit-bukit, dataran tinggi, lembah-lembah, dan tempat-tempat tumbuhnya pohon.',
    category: 'Alam'
  },
  {
    id: 78,
    title: 'Doa Setelah Hujan Berhenti',
    arabic: 'مُطِرْنَا بِفَضْلِ اللّٰهِ وَرَحْمَتِهِ',
    latin: "Muthirnaa bifadhlillaahi wa rahmatih",
    translation: 'Kita diturunkan hujan berkat karunia dan rahmat Allah.',
    category: 'Alam'
  },
  {
    id: 79,
    title: 'Doa Masuk Masjidil Haram / Ka\'bah',
    arabic: 'اَللّٰهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ فَحَيِّنَا رَبَّنَا بِالسَّلَامِ وَأَدْخِلْنَا الْجَنَّةَ دَارَ السَّلَامِ تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    latin: "Allaahumma antas-salaamu wa minkas-salaamu fahayyinaa rabbanaa bis-salaami wa adkhilnal-jannata daaras-salaam. Tabaarakta rabbanaa wa ta'aalaita yaa dzal-jalaali wal-ikraam",
    translation: 'Ya Allah, Engkaulah keselamatan dan dari-Mu keselamatan. Hidupkanlah kami ya Tuhan kami dalam keselamatan, dan masukkanlah kami ke surga, negeri keselamatan. Maha Suci Engkau, Tuhan kami, dan Maha Tinggi wahai Pemilik keagungan dan kemuliaan.',
    category: 'Ibadah'
  },
  {
    id: 80,
    title: 'Doa Mohon Keselamatan & Kebaikan Menyeluruh',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِيْ دِيْنِيْ وَدُنْيَايَ وَأَهْلِيْ وَمَالِيْ',
    latin: "Allaahumma innii as'alukal-'aafiyata fid-dunyaa wal-aakhirah. Allaahumma innii as'alukal-'afwa wal-'aafiyata fii diinii wa dunyaaya wa ahlii wa maalii",
    translation: 'Ya Allah, sesungguhnya aku memohon keselamatan di dunia dan akhirat. Ya Allah, sesungguhnya aku memohon maaf dan keselamatan dalam agamaku, duniaku, keluargaku, dan hartaku.',
    category: 'Utama'
  },
  {
    id: 81,
    title: 'Doa Ruku\'',
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيْمِ وَبِحَمْدِهِ',
    latin: "Subhaana rabbiyal-'azhiimi wa bihamdih",
    translation: 'Maha Suci Tuhanku Yang Maha Agung dan dengan memuji-Nya.',
    category: 'Ibadah'
  },
  {
    id: 82,
    title: 'Doa I\'tidal (Bangun dari Ruku\')',
    arabic: 'سَمِعَ اللّٰهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ مِلْءَ السَّمَاوَاتِ وَمِلْءَ الْأَرْضِ وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ',
    latin: "Sami'allaahu liman hamidah. Rabbanaa wa lakal-hamdu mil'as-samaawaati wa mil'al-ardhi wa mil'a maa syi'ta min syai'in ba'du",
    translation: 'Allah mendengar orang yang memuji-Nya. Tuhan kami, bagi-Mu segala puji sepenuh langit, sepenuh bumi, dan sepenuh apa yang Engkau kehendaki setelah itu.',
    category: 'Ibadah'
  },
  {
    id: 83,
    title: 'Doa Sujud',
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ',
    latin: "Subhaana rabbiyal-a'laa wa bihamdih",
    translation: 'Maha Suci Tuhanku Yang Maha Tinggi dan dengan memuji-Nya.',
    category: 'Ibadah'
  },
  {
    id: 84,
    title: 'Doa Duduk Antara Dua Sujud',
    arabic: 'رَبِّ اغْفِرْ لِيْ وَارْحَمْنِيْ وَاجْبُرْنِيْ وَارْفَعْنِيْ وَارْزُقْنِيْ وَاهْدِنِيْ وَعَافِنِيْ وَاعْفُ عَنِّيْ',
    latin: "Rabbighfir lii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa 'aafinii wa'fu 'annii",
    translation: 'Ya Tuhanku, ampunilah aku, rahmatilah aku, cukupkanlah kekuranganku, angkatlah derajatku, berilah aku rezeki, berilah aku petunjuk, berilah aku kesehatan, dan maafkanlah aku.',
    category: 'Ibadah'
  },
  {
    id: 85,
    title: 'Doa Qunut Nazilah (Saat Umat Islam Tertimpa Musibah)',
    arabic: 'اَللّٰهُمَّ اهْدِنَا فِيْمَنْ هَدَيْتَ وَعَافِنَا فِيْمَنْ عَافَيْتَ وَتَوَلَّنَا فِيْمَنْ تَوَلَّيْتَ وَبَارِكْ لَنَا فِيْمَا أَعْطَيْتَ وَقِنَا شَرَّ مَا قَضَيْتَ',
    latin: "Allaahummahdinaa fiiman hadait, wa 'aafinaa fiiman 'aafait, wa tawallanaa fiiman tawallait, wa baarik lanaa fiimaa a'thait, wa qinaa syarra maa qadhait",
    translation: 'Ya Allah, tunjukilah kami di antara orang-orang yang telah Engkau tunjuki, selamatkan kami di antara orang-orang yang telah Engkau selamatkan, peliharalah kami di antara orang-orang yang telah Engkau pelihara, berkahilah apa yang telah Engkau berikan kepada kami, dan lindungilah kami dari keburukan yang telah Engkau tentukan.',
    category: 'Ibadah'
  },
  {
    id: 86,
    title: 'Doa Akhir Majelis (Kafaratul Majelis)',
    arabic: 'سُبْحَانَكَ اللّٰهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ',
    latin: "Subhaanakallaahumma wa bihamdika asyhadu allaa ilaaha illaa anta astaghfiruka wa atuubu ilaik",
    translation: 'Maha Suci Engkau ya Allah dan dengan memuji-Mu. Aku bersaksi bahwa tidak ada Tuhan selain Engkau, aku memohon ampun dan bertobat kepada-Mu.',
    category: 'Harian'
  },
  {
    id: 87,
    title: 'Doa Pembuka Majelis',
    arabic: 'اَللّٰهُمَّ افْتَحْ لَنَا أَبْوَابَ رَحْمَتِكَ وَأَبْوَابَ فَضْلِكَ',
    latin: "Allaahummaftah lanaa abwaaba rahmatika wa abwaaba fadlik",
    translation: 'Ya Allah, bukalah untuk kami pintu-pintu rahmat-Mu dan pintu-pintu karunia-Mu.',
    category: 'Harian'
  },
  {
    id: 88,
    title: 'Doa Ketika Terjaga di Malam Hari',
    arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ. سُبْحَانَ اللّٰهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ الْعَلِيِّ الْعَظِيْمِ',
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli syai'in qadiir. Subhaanallaahi wal-hamdulillaahi wa laa ilaaha illallaahu wallaahu akbaru wa laa haula wa laa quwwata illaa billaahil-'aliyyil-'azhiim",
    translation: 'Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya pujian, dan Dia Maha Kuasa atas segala sesuatu. Maha Suci Allah, segala puji bagi Allah, tiada Tuhan selain Allah, Allah Maha Besar, dan tiada daya dan kekuatan kecuali dengan Allah Yang Maha Tinggi lagi Maha Agung.',
    category: 'Pagi & Petang'
  },
  {
    id: 89,
    title: 'Doa Memakai Pakaian Baru',
    arabic: 'اَللّٰهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيْهِ، أَسْأَلُكَ خَيْرَهُ وَخَيْرَ مَا صُنِعَ لَهُ، وَأَعُوْذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ',
    latin: "Allaahumma lakal-hamdu anta kasautaniihi, as'aluka khairahuu wa khaira maa shuni'a lah, wa a'uudzu bika min syarrihii wa syarri maa shuni'a lah",
    translation: 'Ya Allah, segala puji bagi-Mu. Engkaulah yang memberiku pakaian ini. Aku memohon kebaikannya dan kebaikan dari apa yang ia dibuat untuknya, dan aku berlindung dari keburukannya dan keburukan dari apa yang ia dibuat untuknya.',
    category: 'Harian'
  },
  {
    id: 90,
    title: 'Doa Ketika Susah Tidur',
    arabic: 'اَللّٰهُمَّ غَارَتِ النُّجُوْمُ وَهَدَأَتِ الْعُيُوْنُ وَأَنْتَ حَيٌّ قَيُّوْمٌ لَا تَأْخُذُكَ سِنَةٌ وَلَا نَوْمٌ يَا حَيُّ يَا قَيُّوْمُ أَهْدِئْ لَيْلِيْ وَأَنِمْ عَيْنِيْ',
    latin: "Allaahumma ghaaratinnujuumu wa hada'atil-'uyuunu wa anta hayyun qayyuumun laa ta'khudzuka sinatun wa laa naum. Yaa hayyu yaa qayyuumu ahdi' lailii wa anim 'ainii",
    translation: 'Ya Allah, bintang-bintang telah tenggelam, mata-mata telah terpejam, dan Engkau Maha Hidup dan Maha Berdiri sendiri, tidak mengantuk dan tidak tidur. Wahai Yang Maha Hidup, wahai Yang Maha Berdiri Sendiri, tenangkanlah malamku dan pejamkanlah mataku.',
    category: 'Pagi & Petang'
  },
  {
    id: 91,
    title: 'Doa Mohon Kesembuhan (Untuk Diri Sendiri)',
    arabic: 'اَللّٰهُمَّ رَبَّ النَّاسِ مُذْهِبَ الْبَأْسِ اشْفِنِيْ أَنْتَ الشَّافِيْ لَا شَافِيَ إِلَّا أَنْتَ شِفَاءً لَا يُغَادِرُ سَقَمًا',
    latin: "Allaahumma rabban-naasi mudzhibal-ba'si isyfinii antasy-syaafii laa syaafiya illaa anta syifaa'an laa yughaadiru saqamaa",
    translation: 'Ya Allah, Tuhan pemelihara manusia, yang menghilangkan penyakit. Sembuhkanlah aku, Engkaulah Yang Maha Menyembuhkan, tidak ada yang menyembuhkan selain Engkau, sembuhkanlah dengan kesembuhan yang tidak menyisakan penyakit.',
    category: 'Utama'
  },
  {
    id: 92,
    title: 'Doa Mengusap Anggota Tubuh yang Sakit',
    arabic: 'بِسْمِ اللّٰهِ (ثَلَاثًا) أَعُوْذُ بِعِزَّةِ اللّٰهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ',
    latin: "Bismillaah (3x). A'uudzu bi'izzatillaahi wa qudratihii min syarri maa ajidu wa uhaadzir",
    translation: 'Dengan nama Allah (3x). Aku berlindung dengan kemuliaan Allah dan kekuasaan-Nya dari kejahatan/keburukan yang aku rasakan dan aku khawatirkan.',
    category: 'Harian'
  },
  {
    id: 93,
    title: 'Doa Perlindungan dari Penyakit',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْبَرَصِ وَالْجُنُوْنِ وَالْجُذَامِ وَمِنْ سَيِّئِ الْأَسْقَامِ',
    latin: "Allaahumma innii a'uudzu bika minal-barashi wal-junuuni wal-judzaami wa min sayyi'il-asqaam",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari penyakit belang, gila, kusta, dan dari segala penyakit yang buruk.',
    category: 'Utama'
  },
  {
    id: 94,
    title: 'Doa Perlindungan dari Azab Kubur',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِ وَمِنْ عَذَابِ النَّارِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ فِتْنَةِ الْمَسِيْحِ الدَّجَّالِ',
    latin: "Allaahumma innii a'uudzu bika min 'adzaabil-qabri wa min 'adzaabin-naar wa min fitnatil-mahyaa wal-mamaat wa min fitnatil-masiihid-dajjaal",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari azab kubur, dari azab neraka, dari fitnah kehidupan dan kematian, dan dari fitnah Al-Masih Dajjal.',
    category: 'Utama'
  },
  {
    id: 95,
    title: 'Doa Ketika Mendengar Ayam Berkokok',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ فَضْلِكَ',
    latin: "Allaahumma innii as'aluka min fadlik",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu dari karunia-Mu. (Karena ayam berkokok saat melihat malaikat)',
    category: 'Harian'
  },
  {
    id: 96,
    title: 'Doa Sholat Witir (Qunut Witir)',
    arabic: 'اَللّٰهُمَّ اهْدِنِيْ فِيْمَنْ هَدَيْتَ وَعَافِنِيْ فِيْمَنْ عَافَيْتَ وَتَوَلَّنِيْ فِيْمَنْ تَوَلَّيْتَ وَبَارِكْ لِيْ فِيْمَا أَعْطَيْتَ وَقِنِيْ شَرَّ مَا قَضَيْتَ فَإِنَّكَ تَقْضِيْ وَلَا يُقْضَى عَلَيْكَ وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ وَلَا يَعِزُّ مَنْ عَادَيْتَ تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',
    latin: "Allaahummahdinii fiiman hadait, wa 'aafinii fiiman 'aafait, wa tawallanii fiiman tawallait, wa baarik lii fiimaa a'thait, wa qinii syarra maa qadhait. Fa-innaka taqdhii wa laa yuqdhaa 'alaik, wa innahu laa yadzillu man waalait, wa laa ya'izzu man 'aadait. Tabaarakta rabbanaa wa ta'aalait",
    translation: 'Ya Allah, tunjukilah aku di antara orang yang Engkau tunjuki, sehatkan aku di antara yang Engkau sehatkan, peliharalah aku di antara yang Engkau pelihara, berkahilah apa yang Engkau berikan, dan lindungilah aku dari keburukan yang Engkau tentukan. Engkaulah yang menentukan dan tidak ada yang menentukan atas-Mu. Tidak hina orang yang Engkau lindungi dan tidak mulia orang yang Engkau musuhi. Maha Suci dan Maha Tinggi Engkau, Tuhan kami.',
    category: 'Ibadah'
  },
  {
    id: 97,
    title: 'Doa Memasuki Kota / Desa Baru',
    arabic: 'اَللّٰهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ وَرَبَّ الْأَرَضِيْنَ السَّبْعِ وَمَا أَقْلَلْنَ، وَرَبَّ الشَّيَاطِيْنِ وَمَا أَضْلَلْنَ وَرَبَّ الرِّيَاحِ وَمَا ذَرَيْنَ، أَسْأَلُكَ خَيْرَ هَذِهِ الْقَرْيَةِ وَخَيْرَ أَهْلِهَا وَأَعُوْذُ بِكَ مِنْ شَرِّهَا وَشَرِّ أَهْلِهَا',
    latin: "Allaahumma rabbas-samaawaatis-sab'i wa maa azhlalna wa rabbal-aradhiinas-sab'i wa maa aqlalna wa rabbasy-syayaathiini wa maa adhlalna wa rabbar-riyaahi wa maa dzaraina. As'aluka khaira haadzihil-qaryati wa khaira ahlihaa wa a'uudzu bika min syarrihaa wa syarri ahlihaa",
    translation: 'Ya Allah, Tuhan tujuh langit dan apa yang dinaunginya, Tuhan tujuh bumi dan apa yang dipikulnya, Tuhan setan dan apa yang disesatkannya, Tuhan angin dan apa yang diterbangkannya. Aku memohon kepada-Mu kebaikan kota ini dan kebaikan penduduknya, dan aku berlindung dari keburukannya dan keburukan penduduknya.',
    category: 'Aktivitas'
  },
  {
    id: 98,
    title: 'Doa Ketika Naik Bukit / Mendaki',
    arabic: 'اَللّٰهُ أَكْبَرُ، اَللّٰهُ أَكْبَرُ، اَللّٰهُ أَكْبَرُ',
    latin: "Allaahu Akbar, Allaahu Akbar, Allaahu Akbar",
    translation: 'Allah Maha Besar, Allah Maha Besar, Allah Maha Besar.',
    category: 'Aktivitas'
  },
  {
    id: 99,
    title: 'Doa Ketika Menuruni Lembah',
    arabic: 'سُبْحَانَ اللّٰهِ، سُبْحَانَ اللّٰهِ، سُبْحَانَ اللّٰهِ',
    latin: "Subhaanallaah, Subhaanallaah, Subhaanallaah",
    translation: 'Maha Suci Allah, Maha Suci Allah, Maha Suci Allah.',
    category: 'Aktivitas'
  },
  {
    id: 100,
    title: 'Doa Ketika Ada Orang Memuji Kita',
    arabic: 'اَللّٰهُمَّ لَا تُؤَاخِذْنِيْ بِمَا يَقُوْلُوْنَ وَاغْفِرْ لِيْ مَا لَا يَعْلَمُوْنَ وَاجْعَلْنِيْ خَيْرًا مِمَّا يَظُنُّوْنَ',
    latin: "Allaahumma laa tu'aakhidznii bimaa yaquuluuna waghfir lii maa laa ya'lamuuna waj'alnii khairan mimmaa yazhunnuun",
    translation: 'Ya Allah, janganlah Engkau hukum aku karena apa yang mereka katakan, ampunilah aku dari apa yang tidak mereka ketahui, dan jadikanlah aku lebih baik dari apa yang mereka sangka.',
    category: 'Harian'
  },
  {
    id: 101,
    title: 'Doa Ketika Mendapat Nikmat',
    arabic: 'اَللّٰهُمَّ أَعِنِّيْ عَلَى شُكْرِكَ وَذِكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    latin: "Allaahumma a'innii 'alaa syukrika wa dzikrika wa husni 'ibaadatik",
    translation: 'Ya Allah, bantulah aku untuk bersyukur kepada-Mu, mengingat-Mu, dan memperbagus ibadah kepada-Mu.',
    category: 'Harian'
  },
  {
    id: 102,
    title: 'Doa Mohon Hidayah dan Taufik',
    arabic: 'اَللّٰهُمَّ أَلْهِمْنِيْ رُشْدِيْ وَأَعِذْنِيْ مِنْ شَرِّ نَفْسِيْ',
    latin: "Allaahumma alhimnii rusydii wa a'idznii min syarri nafsii",
    translation: 'Ya Allah, ilhamkanlah kepadaku petunjuk-Mu dan lindungilah aku dari keburukan diriku sendiri.',
    category: 'Utama'
  },
  {
    id: 103,
    title: 'Doa Mohon Rezeki yang Halal',
    arabic: 'اَللّٰهُمَّ ارْزُقْنِيْ رِزْقًا حَلَالًا طَيِّبًا مُبَارَكًا فِيْهِ كَمَا أَنْتَ وَلِيُّهُ وَمَالِكُهُ',
    latin: "Allaahummarzuqnii rizqan halaalan thayyiban mubaarakan fiihi kamaa anta waliyyuhu wa maalikuh",
    translation: 'Ya Allah, berilah aku rezeki yang halal, baik, dan berkah di dalamnya, sebagaimana Engkau adalah pemilik dan penguasanya.',
    category: 'Utama'
  },
  {
    id: 104,
    title: 'Doa Tolak Bala',
    arabic: 'بِسْمِ اللّٰهِ الَّذِيْ لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيْعُ الْعَلِيْمُ',
    latin: "Bismillaahil-ladzii laa yadhurru ma'asmihi syai'un fil-ardhi wa laa fis-samaa'i wa huwas-samii'ul-'aliim",
    translation: 'Dengan nama Allah yang tidak ada sesuatu pun di bumi dan di langit yang membahayakan bersama nama-Nya, dan Dia Maha Mendengar lagi Maha Mengetahui.',
    category: 'Pagi & Petang'
  },
  {
    id: 105,
    title: 'Doa Tawakkal',
    arabic: 'حَسْبُنَا اللّٰهُ وَنِعْمَ الْوَكِيْلُ',
    latin: "Hasbunallaahu wa ni'mal-wakiil",
    translation: 'Cukuplah Allah sebagai penolong kami dan Dia adalah sebaik-baik pelindung.',
    category: 'Utama'
  },
  {
    id: 106,
    title: 'Doa Sholat Taubat',
    arabic: 'أَسْتَغْفِرُ اللّٰهَ الَّذِيْ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّوْمُ وَأَتُوْبُ إِلَيْهِ',
    latin: "Astaghfirullaahal-ladzii laa ilaaha illaa huwal-hayyul-qayyuumu wa atuubu ilaih",
    translation: 'Aku memohon ampun kepada Allah yang tiada Tuhan selain Dia, Yang Maha Hidup dan Maha Berdiri Sendiri, dan aku bertobat kepada-Nya.',
    category: 'Ibadah'
  },
  {
    id: 107,
    title: 'Doa Sholat Hajat',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ وَأَتَوَجَّهُ إِلَيْكَ بِنَبِيِّنَا مُحَمَّدٍ نَبِيِّ الرَّحْمَةِ، يَا مُحَمَّدُ إِنِّيْ أَتَوَجَّهُ بِكَ إِلَى رَبِّيْ فِيْ حَاجَتِيْ هَذِهِ لِتُقْضَى لِيْ، اَللّٰهُمَّ فَشَفِّعْهُ فِيَّ',
    latin: "Allaahumma innii as'aluka wa atawajjahu ilaika binabiyyinaa Muhammadin nabiyyir-rahmah. Yaa Muhammad innii atawajjahu bika ilaa rabbii fii haajatii haadzihii litaqdhaa lii. Allaahumma fasyaffi'hu fiyya",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu dan menghadap kepada-Mu dengan perantaraan Nabi kami Muhammad, Nabi pembawa rahmat. Wahai Muhammad, sesungguhnya aku menghadap denganmu kepada Tuhanku dalam hajatku ini agar dikabulkan. Ya Allah, terimalah syafaatnya untukku.',
    category: 'Ibadah'
  },
  {
    id: 108,
    title: 'Doa Ketika Melihat Kebakaran',
    arabic: 'اَللّٰهُ أَكْبَرُ',
    latin: "Allaahu Akbar",
    translation: 'Allah Maha Besar. (Karena bertakbir dapat memadamkan api)',
    category: 'Alam'
  },
  {
    id: 109,
    title: 'Doa Ketika Melihat Buah Pertama Musim',
    arabic: 'اَللّٰهُمَّ بَارِكْ لَنَا فِيْ ثَمَرِنَا وَبَارِكْ لَنَا فِيْ مَدِيْنَتِنَا وَبَارِكْ لَنَا فِيْ صَاعِنَا وَبَارِكْ لَنَا فِيْ مُدِّنَا',
    latin: "Allaahumma baarik lanaa fii tsamarinaa wa baarik lanaa fii madiinatinaa wa baarik lanaa fii shaa'inaa wa baarik lanaa fii muddinaa",
    translation: 'Ya Allah, berkahilah kami pada buah-buahan kami, berkahilah kami di kota kami, berkahilah kami pada takaran sha\' kami, dan berkahilah kami pada takaran mud kami.',
    category: 'Harian'
  },
  {
    id: 110,
    title: 'Doa Ketika Puasa Terancam Batal',
    arabic: 'إِنِّيْ صَائِمٌ، إِنِّيْ صَائِمٌ',
    latin: "Innii shaa'imun, innii shaa'imun",
    translation: 'Sesungguhnya aku sedang berpuasa, sesungguhnya aku sedang berpuasa.',
    category: 'Ibadah'
  },
  {
    id: 111,
    title: 'Doa Sholat Jenazah (Takbir ke-3)',
    arabic: 'اَللّٰهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا وَشَاهِدِنَا وَغَائِبِنَا وَصَغِيْرِنَا وَكَبِيْرِنَا وَذَكَرِنَا وَأُنْثَانَا. اَللّٰهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الْإِسْلَامِ وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الْإِيْمَانِ',
    latin: "Allaahummagh-fir lihayyinaa wa mayyitinaa wa syaahidinaa wa ghaa'ibinaa wa shaghiirinaa wa kabiirinaa wa dzakarinaa wa untsaanaa. Allaahumma man ahyaitahu minnaa fa-ahyihi 'alal-islaami wa man tawaffaitahu minnaa fatawaffahu 'alal-iimaan",
    translation: 'Ya Allah, ampunilah orang yang hidup dan yang mati dari kami, yang hadir dan yang tidak hadir, yang kecil dan yang besar, yang laki-laki dan yang perempuan. Ya Allah, siapa yang Engkau hidupkan dari kami maka hidupkanlah ia dalam Islam, dan siapa yang Engkau matikan dari kami maka matikanlah ia dalam keimanan.',
    category: 'Ibadah'
  },
  {
    id: 112,
    title: 'Doa Ketika Singgah / Menginap di Suatu Tempat',
    arabic: 'أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    latin: "A'uudzu bikalimaatillaahit-taammaati min syarri maa khalaq",
    translation: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang diciptakan-Nya.',
    category: 'Aktivitas'
  },
  {
    id: 113,
    title: 'Doa Sholat Tarawih',
    arabic: 'اَللّٰهُمَّ اجْعَلْنَا مِنْ عُتَقَائِكَ مِنَ النَّارِ وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ يَا عَزِيْزُ يَا غَفَّارُ يَا رَبَّ الْعَالَمِيْنَ',
    latin: "Allaahummaj'alnaa min 'utaqaa'ika minan-naari wa adkhilnal-jannata ma'al-abraari yaa 'aziizu yaa ghaffaaru yaa rabbal-'aalamiin",
    translation: 'Ya Allah, jadikanlah kami di antara orang-orang yang Engkau bebaskan dari api neraka dan masukanlah kami ke surga bersama orang-orang yang baik, wahai Yang Maha Mulia, wahai Yang Maha Pengampun, wahai Tuhan semesta alam.',
    category: 'Ibadah'
  },
  {
    id: 114,
    title: 'Doa Ketika Tersesat atau Bingung Arah',
    arabic: 'يَا عِبَادَ اللّٰهِ أَرْشِدُوْنَا، يَا عِبَادَ اللّٰهِ أَرْشِدُوْنَا، يَا عِبَادَ اللّٰهِ أَرْشِدُوْنَا',
    latin: "Yaa 'ibaadallaahi arsyiduunaa, yaa 'ibaadallaahi arsyiduunaa, yaa 'ibaadallaahi arsyiduunaa",
    translation: 'Wahai hamba-hamba Allah, tunjukilah kami jalan. Wahai hamba-hamba Allah, tunjukilah kami jalan. Wahai hamba-hamba Allah, tunjukilah kami jalan.',
    category: 'Aktivitas'
  },
  {
    id: 115,
    title: 'Doa Hari Arafah',
    arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ',
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lahu lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli syai'in qadiir",
    translation: 'Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya, bagi-Nya kerajaan, bagi-Nya segala pujian, dan Dia Maha Kuasa atas segala sesuatu.',
    category: 'Ibadah'
  },
  {
    id: 116,
    title: 'Doa Tahun Baru Islam (1 Muharram)',
    arabic: 'اَللّٰهُمَّ أَدْخِلْهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيْمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ وَرِضْوَانٍ مِنَ الرَّحْمٰنِ وَجِوَارٍ مِنَ الشَّيْطَانِ',
    latin: "Allaahumma adkhilhu 'alainaa bil-amni wal-iimaani was-salaamati wal-islaami wa ridhwaanin minar-rahmaani wa jiwaarim minasy-syaithaan",
    translation: 'Ya Allah, masukkanlah tahun baru ini atas kami dengan keamanan, keimanan, keselamatan, Islam, ridha dari Yang Maha Pengasih, dan perlindungan dari setan.',
    category: 'Ibadah'
  },
  {
    id: 117,
    title: 'Doa Memakai Sandal / Sepatu',
    arabic: 'بِسْمِ اللّٰهِ',
    latin: "Bismillaah",
    translation: 'Dengan nama Allah. (Mulai dari kaki kanan)',
    category: 'Harian'
  },
  {
    id: 118,
    title: 'Doa Melepas Sandal / Sepatu',
    arabic: 'بِسْمِ اللّٰهِ',
    latin: "Bismillaah",
    translation: 'Dengan nama Allah. (Mulai dari kaki kiri)',
    category: 'Harian'
  },
  {
    id: 119,
    title: 'Doa Nabi Yunus (Saat Dalam Kesulitan Besar)',
    arabic: 'لَا إِلٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّيْ كُنْتُ مِنَ الظَّالِمِيْنَ',
    latin: "Laa ilaaha illaa anta subhaanaka innii kuntu minazh-zhaalimiin",
    translation: 'Tiada Tuhan selain Engkau, Maha Suci Engkau. Sesungguhnya aku termasuk orang-orang yang zalim.',
    category: 'Utama'
  },
  {
    id: 120,
    title: 'Doa Nabi Ibrahim (Mohon Dijadikan Orang yang Mendirikan Sholat)',
    arabic: 'رَبِّ اجْعَلْنِيْ مُقِيْمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِيْ ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    latin: "Rabbij'alnii muqiimash-shalaati wa min dzurriyyatii, rabbanaa wa taqabbal du'aa'",
    translation: 'Ya Tuhanku, jadikanlah aku orang yang tetap mendirikan sholat, dan juga anak cucuku. Ya Tuhan kami, perkenankanlah doaku.',
    category: 'Utama'
  },
  {
    id: 121,
    title: 'Doa Nabi Musa (Mohon Kemudahan Bicara)',
    arabic: 'رَبِّ اشْرَحْ لِيْ صَدْرِيْ وَيَسِّرْ لِيْ أَمْرِيْ وَاحْلُلْ عُقْدَةً مِنْ لِسَانِيْ يَفْقَهُوْا قَوْلِيْ',
    latin: "Rabbisyrah lii shadrii wa yassir lii amrii wahlul 'uqdatan min lisaanii yafqahuu qaulii",
    translation: 'Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan lepaskanlah kekakuan dari lidahku agar mereka mengerti perkataanku.',
    category: 'Utama'
  },
  {
    id: 122,
    title: 'Doa Nabi Ayub (Memohon Kesembuhan & Kesabaran)',
    arabic: 'أَنِّيْ مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِيْنَ',
    latin: "Annii massaniyadh-dhurru wa anta arhamur-raahimiin",
    translation: 'Sesungguhnya aku telah ditimpa penyakit dan Engkau adalah Tuhan Yang Maha Penyayang di antara semua penyayang.',
    category: 'Utama'
  },
  {
    id: 123,
    title: 'Doa Nabi Sulaiman (Bersyukur atas Nikmat)',
    arabic: 'رَبِّ أَوْزِعْنِيْ أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِيْ أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِيْ بِرَحْمَتِكَ فِيْ عِبَادِكَ الصَّالِحِيْنَ',
    latin: "Rabbi auzi'nii an asykura ni'matakal-latii an'amta 'alayya wa 'alaa waalidayya wa an a'mala shaalihan tardhaahu wa adkhilnii birahmatika fii 'ibaadikas-shaalihiin",
    translation: 'Ya Tuhanku, ilhamilah aku untuk tetap mensyukuri nikmat-Mu yang telah Engkau anugerahkan kepadaku dan kepada kedua ibu bapakku, dan agar aku mengerjakan kebajikan yang Engkau ridhai, dan masukkanlah aku dengan rahmat-Mu ke dalam golongan hamba-hamba-Mu yang saleh.',
    category: 'Utama'
  },
  {
    id: 124,
    title: 'Talbiyah (Niat Haji/Umrah)',
    arabic: 'لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيْكَ لَكَ',
    latin: "Labbaikallahumma labbaik, labbaika laa syariika laka labbaik. Innal-hamda wan-ni'mata laka wal-mulk, laa syariika lak",
    translation: 'Aku penuhi panggilan-Mu ya Allah, aku penuhi. Aku penuhi panggilan-Mu, tiada sekutu bagi-Mu, aku penuhi. Sesungguhnya segala puji, nikmat, dan kerajaan hanya milik-Mu, tiada sekutu bagi-Mu.',
    category: 'Ibadah'
  },
  {
    id: 125,
    title: 'Doa Melihat Ka\'bah Pertama Kali',
    arabic: 'اَللّٰهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيْفًا وَتَعْظِيْمًا وَتَكْرِيْمًا وَمَهَابَةً، وَزِدْ مَنْ شَرَّفَهُ وَكَرَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيْفًا وَتَكْرِيْمًا وَتَعْظِيْمًا وَبِرًّا',
    latin: "Allaahumma zid haadzal-baita tasyriifan wa ta'zhiiman wa takriiman wa mahaabah, wa zid man syarrafahuu wa karramahuu mimman hajjahuu awi'tamarahuu tasyriifan wa takriiman wa ta'zhiiman wa birraa",
    translation: 'Ya Allah, tambahkanlah kemuliaan, keagungan, kehormatan, dan kewibawaan pada Baitullah ini. Dan tambahkanlah pula kemuliaan, kehormatan, keagungan, dan kebaikan kepada orang yang memuliakannya dari mereka yang berhaji atau berumrah.',
    category: 'Ibadah'
  },
  {
    id: 126,
    title: 'Doa Minum Air Zamzam',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ',
    latin: "Allaahumma innii as'aluka 'ilman naafi'an wa rizqan waasi'an wa syifaa'an min kulli daa'",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang luas, dan kesembuhan dari segala penyakit.',
    category: 'Ibadah'
  },
  {
    id: 127,
    title: 'Doa Sa\'i (Safa & Marwah)',
    arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللّٰهِ، أَبْدَأُ بِمَا بَدَأَ اللّٰهُ بِهِ',
    latin: "Innash-shafaa wal-marwata min sya'aa'irillaah. Abda'u bimaa bada'allaahu bih",
    translation: 'Sesungguhnya Shafa dan Marwah termasuk syiar-syiar Allah. Aku memulai dengan apa yang Allah mulai dengannya.',
    category: 'Ibadah'
  },
  {
    id: 128,
    title: 'Doa Bertemu Sesama Muslim',
    arabic: 'اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ',
    latin: "As-salaamu 'alaikum wa rahmatullaahi wa barakaatuh",
    translation: 'Semoga keselamatan, rahmat Allah, dan berkah-Nya tercurah kepadamu.',
    category: 'Harian'
  },
  {
    id: 129,
    title: 'Doa Ketika Berpisah dengan Seseorang',
    arabic: 'أَسْتَوْدِعُكَ اللّٰهَ الَّذِيْ لَا تَضِيْعُ وَدَائِعُهُ',
    latin: "Astaudi'ukallaahalladzii laa tadhii'u wadaa'i'uh",
    translation: 'Aku titipkan kamu kepada Allah yang titipan-Nya tidak pernah hilang.',
    category: 'Harian'
  },
  {
    id: 130,
    title: 'Doa Memohon Jodoh / Pasangan yang Baik',
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِيْنَ إِمَامًا',
    latin: "Rabbanaa hab lanaa min azwaajinaa wa dzurriyyaatinaa qurrata a'yunin waj'alnaa lil-muttaqiina imaamaa",
    translation: 'Ya Tuhan kami, anugerahkanlah kepada kami dari istri-istri kami dan keturunan kami sebagai penyenang hati, dan jadikanlah kami imam bagi orang-orang yang bertakwa.',
    category: 'Keluarga'
  },
  {
    id: 131,
    title: 'Doa Ketika Melihat Gerhana',
    arabic: 'اَللّٰهُ أَكْبَرُ، اَللّٰهُمَّ لَا تُنْزِلْ بِنَا سُخْطَكَ وَعَذَابَكَ',
    latin: "Allaahu akbar. Allaahumma laa tunzil binaa sukhtaka wa 'adzaabak",
    translation: 'Allah Maha Besar. Ya Allah, janganlah Engkau turunkan murka dan azab-Mu kepada kami.',
    category: 'Alam'
  },
  {
    id: 132,
    title: 'Doa Memohon Keistiqomahan',
    arabic: 'اَللّٰهُمَّ يَا مُصَرِّفَ الْقُلُوْبِ صَرِّفْ قُلُوْبَنَا عَلَى طَاعَتِكَ',
    latin: "Allaahumma yaa musharrifal-quluubi sharrif quluubanaa 'alaa thaa'atik",
    translation: 'Ya Allah, wahai Dzat yang mengarahkan hati, arahkanlah hati kami untuk taat kepada-Mu.',
    category: 'Utama'
  },
  {
    id: 133,
    title: 'Doa Memohon Akhlak yang Baik',
    arabic: 'اَللّٰهُمَّ اهْدِنِيْ لِأَحْسَنِ الْأَخْلَاقِ لَا يَهْدِيْ لِأَحْسَنِهَا إِلَّا أَنْتَ وَاصْرِفْ عَنِّيْ سَيِّئَهَا لَا يَصْرِفُ عَنِّيْ سَيِّئَهَا إِلَّا أَنْتَ',
    latin: "Allaahummahdinii li-ahsanil-akhlaaqi laa yahdii li-ahsanihaa illaa anta washrif 'annii sayyi'ahaa laa yashrifu 'annii sayyi'ahaa illaa anta",
    translation: 'Ya Allah, tunjukilah aku kepada akhlak yang terbaik, tidak ada yang menunjukkan kepada yang terbaik darinya kecuali Engkau. Dan palingkanlah dariku akhlak yang buruk, tidak ada yang memalingkan dari yang buruknya kecuali Engkau.',
    category: 'Utama'
  },
  {
    id: 134,
    title: 'Doa Ayat Kursi (Perlindungan Agung)',
    arabic: 'اَللّٰهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّوْمُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيْهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُوْدُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ',
    latin: "Allaahu laa ilaaha illaa huwal-hayyul-qayyuum. Laa ta'khudzuhu sinatun wa laa naum. Lahu maa fis-samaawaati wa maa fil-ardh. Man dzal-ladzii yasyfa'u 'indahu illaa bi-idznih. Ya'lamu maa baina aidiihim wa maa khalfahum. Wa laa yuhiithuuna bisyai'in min 'ilmihii illaa bimaa syaa'. Wasi'a kursiyyuhus-samaawaati wal-ardh. Wa laa ya'uuduhu hifzhuhumaa. Wa huwal-'aliyyul-'azhiim",
    translation: 'Allah, tiada Tuhan selain Dia, Yang Maha Hidup dan terus-menerus mengurus makhluk-Nya. Tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan di bumi. Siapakah yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya? Dia mengetahui apa yang di hadapan mereka dan apa yang di belakang mereka. Dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi, dan Dia tidak merasa berat memelihara keduanya. Dan Dia Maha Tinggi lagi Maha Agung.',
    category: 'Pagi & Petang'
  },
  {
    id: 135,
    title: 'Sholawat Nabi (Sholawat Ibrahimiyah)',
    arabic: 'اَللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيْمَ وَعَلَى آلِ إِبْرَاهِيْمَ إِنَّكَ حَمِيْدٌ مَجِيْدٌ، اَللّٰهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيْمَ وَعَلَى آلِ إِبْرَاهِيْمَ إِنَّكَ حَمِيْدٌ مَجِيْدٌ',
    latin: "Allaahumma shalli 'alaa Muhammadin wa 'alaa aali Muhammadin kamaa shallaita 'alaa Ibraahiima wa 'alaa aali Ibraahiima innaka hamiidun majiid. Allaahumma baarik 'alaa Muhammadin wa 'alaa aali Muhammadin kamaa baarakta 'alaa Ibraahiima wa 'alaa aali Ibraahiima innaka hamiidun majiid",
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana Engkau telah melimpahkan sholawat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, limpahkanlah berkah kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana Engkau telah melimpahkan berkah kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
    category: 'Ibadah'
  },
  {
    id: 136,
    title: 'Doa Sebelum Ujian / Tes',
    arabic: 'رَبِّ اشْرَحْ لِيْ صَدْرِيْ وَيَسِّرْ لِيْ أَمْرِيْ',
    latin: "Rabbisyrah lii shadrii wa yassir lii amrii",
    translation: 'Ya Tuhanku, lapangkanlah dadaku dan mudahkanlah urusanku.',
    category: 'Harian'
  },
  {
    id: 137,
    title: 'Doa Memohon Pertolongan Allah',
    arabic: 'يَا حَيُّ يَا قَيُّوْمُ بِرَحْمَتِكَ أَسْتَغِيْثُ أَصْلِحْ لِيْ شَأْنِيْ كُلَّهُ وَلَا تَكِلْنِيْ إِلَى نَفْسِيْ طَرْفَةَ عَيْنٍ',
    latin: "Yaa hayyu yaa qayyuumu birahmatika astaghiitsu ashlih lii sya'nii kullahu wa laa takilnii ilaa nafsii tharfata 'ain",
    translation: 'Wahai Dzat Yang Maha Hidup, wahai Dzat Yang Maha Berdiri Sendiri, dengan rahmat-Mu aku memohon pertolongan. Perbaikilah seluruh urusanku dan jangan Engkau serahkan aku kepada diriku sendiri walau sekejap mata.',
    category: 'Utama'
  },
  {
    id: 138,
    title: 'Doa Anak Sholeh untuk Orang Tua yang Sudah Meninggal',
    arabic: 'اَللّٰهُمَّ اغْفِرْ لَهُمَا وَارْحَمْهُمَا وَعَافِهِمَا وَاعْفُ عَنْهُمَا وَأَكْرِمْ نُزُلَهُمَا وَوَسِّعْ مُدْخَلَهُمَا وَاغْسِلْهُمَا بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ',
    latin: "Allaahummagh-fir lahumaa warhamhumaa wa 'aafihumaa wa'fu 'anhumaa wa akrim nuzulahumaa wa wassi' mudkhalahumaa waghsilhumaa bil-maa'i wats-tsalji wal-barad",
    translation: 'Ya Allah, ampunilah keduanya, rahmatilah keduanya, selamatkanlah keduanya, maafkanlah keduanya, muliakanlah tempat keduanya, luaskanlah tempat masuk keduanya, dan cucilah keduanya dengan air, salju, dan es.',
    category: 'Keluarga'
  },
  {
    id: 139,
    title: 'Doa Ketika Berdoa dan Meminta',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ بِأَنِّيْ أَشْهَدُ أَنَّكَ أَنْتَ اللّٰهُ لَا إِلٰهَ إِلَّا أَنْتَ الْأَحَدُ الصَّمَدُ الَّذِيْ لَمْ يَلِدْ وَلَمْ يُوْلَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
    latin: "Allaahumma innii as'aluka bi-annii asyhadu annaka antallaahu laa ilaaha illaa antal-ahadush-shamadulladzii lam yalid wa lam yuulad wa lam yakun lahu kufuwan ahad",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu, karena sesungguhnya aku bersaksi bahwa Engkau adalah Allah, tiada Tuhan selain Engkau, Yang Maha Esa, tempat bergantung, yang tidak beranak dan tidak diperanakkan, dan tidak ada sesuatu pun yang setara dengan-Nya.',
    category: 'Utama'
  },
  {
    id: 140,
    title: 'Dzikir Setelah Sholat - Tasbih',
    arabic: 'سُبْحَانَ اللّٰهِ (٣٣ مَرَّة)',
    latin: "Subhaanallaah (33 kali)",
    translation: 'Maha Suci Allah. (Dibaca 33 kali setelah sholat fardhu)',
    category: 'Ibadah'
  },
  {
    id: 141,
    title: 'Dzikir Setelah Sholat - Tahmid',
    arabic: 'اَلْحَمْدُ لِلّٰهِ (٣٣ مَرَّة)',
    latin: "Alhamdulillaah (33 kali)",
    translation: 'Segala puji bagi Allah. (Dibaca 33 kali setelah sholat fardhu)',
    category: 'Ibadah'
  },
  {
    id: 142,
    title: 'Dzikir Setelah Sholat - Takbir',
    arabic: 'اَللّٰهُ أَكْبَرُ (٣٣ مَرَّة)',
    latin: "Allaahu Akbar (33 kali)",
    translation: 'Allah Maha Besar. (Dibaca 33 kali setelah sholat fardhu)',
    category: 'Ibadah'
  },
  {
    id: 143,
    title: 'Dzikir Penutup Setelah Tasbih, Tahmid, Takbir',
    arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ',
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli syai'in qadiir",
    translation: 'Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya. Bagi-Nya kerajaan, bagi-Nya segala puji, dan Dia Maha Kuasa atas segala sesuatu. (Dibaca 1 kali sebagai penutup)',
    category: 'Ibadah'
  },
  {
    id: 144,
    title: 'Doa Sebelum Tidur - Membaca Al-Ikhlas',
    arabic: 'قُلْ هُوَ اللّٰهُ أَحَدٌ ۝ اَللّٰهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُوْلَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
    latin: "Qul huwallaahu ahad. Allaahush-shamad. Lam yalid wa lam yuulad. Wa lam yakun lahu kufuwan ahad",
    translation: 'Katakanlah: "Dialah Allah, Yang Maha Esa. Allah tempat meminta segala sesuatu. Dia tidak beranak dan tidak pula diperanakkan. Dan tidak ada seorang pun yang setara dengan Dia." (Dibaca 3x sebelum tidur)',
    category: 'Pagi & Petang'
  },
  {
    id: 145,
    title: 'Doa Ketika Mendapat Rezeki / Penghasilan',
    arabic: 'اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    latin: "Allaahumma baarik lanaa fiimaa razaqtanaa wa qinaa 'adzaaban-naar",
    translation: 'Ya Allah, berkahilah kami pada apa yang telah Engkau rezekikan kepada kami, dan lindungilah kami dari azab api neraka.',
    category: 'Harian'
  },
  {
    id: 146,
    title: 'Doa Sebelum Tidur - Membaca Al-Falaq',
    arabic: 'قُلْ أَعُوْذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفّٰثٰتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    latin: "Qul a'uudzu birabbil-falaq. Min syarri maa khalaq. Wa min syarri ghaasiqin idzaa waqab. Wa min syarri-nnaffaatsaati fil-'uqad. Wa min syarri haasidin idzaa hasad",
    translation: 'Katakanlah: "Aku berlindung kepada Tuhan Yang Menguasai subuh, dari kejahatan makhluk-Nya, dan dari kejahatan malam apabila telah gelap gulita, dan dari kejahatan wanita-wanita penyihir yang meniup pada buhul-buhul, dan dari kejahatan pendengki bila ia dengki." (Dibaca 3x sebelum tidur)',
    category: 'Pagi & Petang'
  },
  {
    id: 147,
    title: 'Doa Sebelum Tidur - Membaca An-Naas',
    arabic: 'قُلْ أَعُوْذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ اِلٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
    latin: "Qul a'uudzu birabbin-naas. Malikin-naas. Ilaahin-naas. Min syarril-waswaasil-khannaas. Alladzii yuwaswisu fii shuduurin-naas. Minal-jinnati wan-naas",
    translation: 'Katakanlah: "Aku berlindung kepada Tuhan manusia. Raja manusia. Sembahan manusia. Dari kejahatan (bisikan) syetan yang biasa bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari (golongan) jin dan manusia." (Dibaca 3x sebelum tidur)',
    category: 'Pagi & Petang'
  },
  {
    id: 148,
    title: 'Doa Ketika Mengalami Mimpi Buruk',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ عَمَلِ الشَّيْطَانِ وَسَيِّئَاتِ الْأَحْلَامِ',
    latin: "Allaahumma innii a'uudzu bika min 'amalisy-syaythaani wa sayyi'aatil-ahlaam",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari perbuatan setan dan mimpi-mimpi yang buruk.',
    category: 'Harian'
  },
  {
    id: 149,
    title: 'Doa Memohon Keteguhan Iman',
    arabic: 'يَا مُقَلِّبَ الْقُلُوْبِ ثَبِّتْ قَلْبِيْ عَلَى دِيْنِكَ',
    latin: "Yaa muqallibal-quluubi tsabbit qalbii 'alaa diinik",
    translation: 'Wahai Dzat yang membolak-balikkan hati, teguhkanlah hatiku di atas agama-Mu.',
    category: 'Utama'
  },
  {
    id: 150,
    title: 'Doa Ketika Bercermin (Lengkap)',
    arabic: 'اَللّٰهُمَّ كَمَا حَسَّنْتَ خَلْقِيْ فَحَسِّنْ خُلُقِيْ وَحَرِّمْ وَجْهِيْ عَلَى النَّارِ',
    latin: "Allaahumma kamaa hassanta khalqii fa hassin khuluqii wa harrim wajhii 'alan-naar",
    translation: 'Ya Allah, sebagaimana Engkau telah membagusun penciptaanku (rupaku), maka baguskanlah akhlakku dan haramkanlah wajahku dari api neraka.',
    category: 'Harian'
  },
  {
    id: 151,
    title: 'Doa Menengok Orang Sakit (Lengkap)',
    arabic: 'لَا بَأْسَ طَهُوْرٌ إِنْ شَاءَ اللّٰهُ، اَللّٰهُمَّ اشْفِهِ اَللّٰهُمَّ عَافِهِ',
    latin: "Laa ba'sa thahuurun in syaa'allaah, Allaahummasy-fih Allaahumma 'aafih",
    translation: 'Tidak apa-apa, semoga sakitmu ini membersihkan dosamu, insya Allah. Ya Allah sembuhkanlah dia, Ya Allah berikanlah kesehatan padanya.',
    category: 'Harian'
  },
  {
    id: 152,
    title: 'Doa Dijauhkan dari Sifat Pelit, Pengecut, dan Pikun',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْبُخْلِ وَأَعُوْذُ بِكَ مِنَ الْجُبْنِ وَأَعُوْذُ بِكَ أَنْ أُرَدَّ إِلَى أَرْذَلِ الْعُمُرِ',
    latin: "Allaahumma innii a'uudzu bika minal-bukhli wa a'uudzu bika minal-jubni wa a'uudzu bika an uradda ilaa ardzalil-'umur",
    translation: 'Ya Allah, aku berlindung kepada-Mu dari sifat kikir, aku berlindung kepada-Mu dari sifat penakut, dan aku berlindung kepada-Mu dari dikembalikan ke usia pikun.',
    category: 'Utama'
  },
  {
    id: 153,
    title: 'Doa Perlindungan dari Teman yang Buruk',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ صَاحِبِ سُوْءٍ وَمِنْ جَارِ سُوْءٍ فِيْ دَارِ الْمُقَامَةِ',
    latin: "Allaahumma innii a'uudzu bika min shaahibi suu'in wa min jaari suu'in fii daaril-muqaamah",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari teman yang buruk dan tetangga yang buruk di tempat tinggal tetapku.',
    category: 'Utama'
  },
  {
    id: 154,
    title: 'Doa Ketika Masuk Pasar atau Mall',
    arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِيْ وَيُمِيْتُ وَهُوَ حَيٌّ لَا يَمُوْتُ بِيَدِهِ الْخَيْرُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ',
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu yuhyii wa yumiitu wa huwa hayyun laa yamuutu biyadihil-khairu wa huwa 'alaa kulli syai'in qadiir",
    translation: 'Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan milik-Nya segala pujian. Dia yang menghidupkan dan yang mematikan, sedangkan Dia Maha Hidup dan tidak akan mati. Di tangan-Nyalah segala kebaikan dan Dia Maha Kuasa atas segala sesuatu.',
    category: 'Aktivitas'
  },
  {
    id: 155,
    title: 'Dzikir Pagi (Membuka Hari)',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ Lِلّٰهِ، وَالْحَمْدُ Lِلّٰهِ، لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ',
    latin: "Ashbahnaa wa ashbahal-mulku lillaah, wal-hamdu lillaah, laa ilaaha illallaahu wahdahu laa syariika lah",
    translation: 'Kami memasuki waktu pagi dan kerajaan tetap milik Allah, segala puji bagi Allah, tidak ada Tuhan selain Allah semata, tiada sekutu bagi-Nya.',
    category: 'Pagi & Petang'
  },
  {
    id: 156,
    title: 'Dzikir Sore (Menutup Hari)',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ Lِلّٰهِ، وَالْحَمْدُ Lِلّٰهِ، لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ',
    latin: "Amsainaa wa amsal-mulku lillaah, wal-hamdu lillaah, laa ilaaha illallaahu wahdahu laa syariika lah",
    translation: 'Kami memasuki waktu sore dan kerajaan tetap milik Allah, segala puji bagi Allah, tidak ada Tuhan selain Allah semata, tiada sekutu bagi-Nya.',
    category: 'Pagi & Petang'
  },
  {
    id: 157,
    title: 'Doa Setelah Belajar',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْتَوْدِعُكَ مَا عَلَّمْتَنِيْهِ فَارْدُدْهُ إِلَيَّ عِنْدَ حَاجَتِيْ إِلَيْهِ وَلَا تُنْسِنِيْهِ يَا رَبَّ الْعَالَمِيْنَ',
    latin: "Allaahumma innii astaudi'uka maa 'allamtanihi fardudhu ilayya 'inda haajatii ilaihi wa laa tunsiniihi yaa rabbal-'aalamiin",
    translation: 'Ya Allah, sesungguhnya aku menitipkan kepada-Mu apa yang telah Engkau ajarkan kepadaku, maka kembalikanlah ia kepadaku saat aku membutuhkannya dan janganlah Engkau buat aku melupakannya, wahai Tuhan semesta alam.',
    category: 'Harian'
  },
  {
    id: 158,
    title: 'Doa Memohon Pemahaman Agama yang Mendalam',
    arabic: 'اَللّٰهُمَّ فَقِّهْنِيْ فِي الدِّيْنِ وَعَلِّمْنِي التَّأْوِيْلَ',
    latin: "Allaahumma faqqihnii fid-diini wa 'allimnit-ta'wiil",
    translation: 'Ya Allah, pahamkanlah aku dalam urusan agama dan ajarkanlah kepadaku ilmu takwil (tafsir).',
    category: 'Utama'
  },
  {
    id: 159,
    title: 'Doa Melindungi Anak dan Keturunan dari Gangguan Setan',
    arabic: 'أُعِيْذُكَ بِكَلِمَاتِ اللّٰهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    latin: "U'iidzuki bikalimaatillaahit-taammati min kulli syaythaanin wa haammatin wa min kulli 'aynin laammah",
    translation: 'Aku memohon perlindungan untukmu dengan kalimat-kalimat Allah yang sempurna dari setiap setan, binatang berbisa, dan dari setiap pandangan mata yang jahat (hasad).',
    category: 'Utama'
  },
  {
    id: 160,
    title: 'Doa Ketika Merasakan Sakit pada Anggota Tubuh',
    arabic: 'بِسْمِ اللّٰهِ (٣×) أَعُوْذُ بِاللّٰهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (٧×)',
    latin: "Bismillaah (3x). A'uudzu billaahi wa qudratihi min syarri maa ajidu wa uhaadziru (7x)",
    translation: 'Dengan nama Allah (3 kali). Aku berlindung kepada Allah dan kekuasaan-Nya dari keburukan apa yang aku rasakan dan aku khawatirkan (7 kali).',
    category: 'Harian'
  },
  {
    id: 161,
    title: 'Doa Menempati Rumah Baru',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ بِسْمِ اللّٰهِ وَلَجْنَا وَبِسْمِ اللّٰهِ خَرَجْنَا وَعَلَى اللّٰهِ رَبِّنَا تَوَكَّلْنَا',
    latin: "Allaahumma innii as'aluka khairal-mawlaji wa khairal-makhraji, bismillaahi walajnaa wa bismillaahi kharajnaa wa 'alallaahi rabbinaa tawakkalnaa",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan tempat masuk dan kebaikan tempat keluar. Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan hanya kepada Allah Tuhan kami, kami bertawakkal.',
    category: 'Aktivitas'
  },
  {
    id: 162,
    title: 'Doa Memohon Keturunan yang Shalih',
    arabic: 'رَبِّ هَبْ لِيْ مِنَ الصَّالِحِيْنَ',
    latin: "Rabbi hab lii minash-shaalihiin",
    translation: 'Ya Tuhanku, anugerahkanlah kepadaku (seorang anak) yang termasuk orang-orang yang shalih.',
    category: 'Utama'
  },
  {
    id: 163,
    title: 'Doa Memohon Kelapangan Dada (Nabi Musa)',
    arabic: 'رَبِّ اشْرَحْ لِيْ صَدْرِيْ ۝ وَيَسِّرْ لِيْ أَمْرِيْ ۝ وَاحْلُلْ عُقْدَةً مِنْ لِسَانِيْ ۝ يَفْقَهُوْا قَوْلِيْ',
    latin: "Rabbisy-rahlii shadrii. Wa yassir lii amrii. Wahlul 'uqdatan min lisaanii. Yafqahuu qawlii",
    translation: 'Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan lepaskanlah kekakuan dari lidahku, agar mereka mengerti perkataanku.',
    category: 'Utama'
  },
  {
    id: 164,
    title: 'Doa Ketika Bersin, Mendengar, dan Membalasnya',
    arabic: 'اَلْحَمْدُ لِلّٰهِ (يَرْحَمُكَ اللّٰهُ - يَهْدِيْكُمُ اللّٰهُ وَيُصْلِحُ بَالَكُمْ)',
    latin: "Al-hamdu lillaah (Yarhamukallaah - Yahdiikumullaahu wa yushlihu baalakum)",
    translation: 'Segala puji bagi Allah. (Balasan bagi pendengar: Semoga Allah merahmatimu. Balasan bersin kembali: Semoga Allah memberimu petunjuk dan memperbaiki keadaanmu.)',
    category: 'Harian'
  },
  {
    id: 165,
    title: 'Doa Penenang Hati dan Pikiran dari Kecemasan',
    arabic: 'اَللّٰهُمَّ إِشْأَلْكَ نَفْسًا بِكَ مُطْمَئِنَّةً، تُؤْمِنُ بِلِقَائِكَ، وَتَرْضَى بِقَضَائِكَ، وَتَقْنَعُ بِعَطَائِكَ',
    latin: "Allaahumma innii as'aluka nafsan bika muthma'innatan, tu'minu biliqaa'ika, wa tardhaa biqadhaa'ika, wa taqna'u bi'athaai'ka",
    translation: 'Ya Allah, aku memohon kepada-Mu jiwa yang tenang di dalam-Mu, yang percaya akan pertemuan dengan-Mu, yang ridha atas ketetapan-Mu, dan yang merasa cukup atas pemberian-Mu.',
    category: 'Utama'
  },
  {
    id: 166,
    title: 'Doa Memohon Keselamatan Dunia Akhirat (Afiyah)',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
    latin: "Allaahumma innii as'alukal-'afwa wal-'aafiyata fid-dunyaa wal-aakhirah",
    translation: 'Ya Allah, sesungguhnya aku memohon ampunan dan keselamatan di dunia dan akhirat.',
    category: 'Utama'
  },
  {
    id: 167,
    title: 'Doa Perlindungan dari Segala Penjuru',
    arabic: 'اَللّٰهُمَّ احْفَظْنِيْ مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِيْ وَعَنْ يَمِيْنِيْ وَعَنْ شِمَالِيْ وَمِنْ فَوْقِيْ وَأَعُوْذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِيْ',
    latin: "Allaahummah-fazhnii min baini yadayya wa min khalfii wa 'an yamiinii wa 'an syimaalii wa min fawqii wa a'uudzu bi'azhamatika an ughtaala min tahtii",
    translation: 'Ya Allah, jagalah aku dari depan, belakang, kanan, kiri, dan atasku. Dan aku berlindung dengan keagungan-Mu dari dibenamkan/dihancurkan dari bawahku.',
    category: 'Utama'
  },
  {
    id: 168,
    title: 'Doa Perlindungan dari Segala Fitnah dan Syubhat',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيْحِ الدَّجَّالِ',
    latin: "Allaahumma innii a'uudzu bika min fitnatil-mahyaa wal-mamaati wa min syarri fitnatil-masiihid-dajjaal",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari fitnah kehidupan dan kematian, serta dari keburukan fitnah Al-Masih Dajjal.',
    category: 'Utama'
  },
  {
    id: 169,
    title: 'Doa Berlindung dari Ilmu yang Tidak Bermanfaat',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ وَمِنْ قَلْبٍ لَا يَخْشَعُ وَمِنْ نَفْسٍ لَا تَشْبَعُ وَمِنْ دَعْوَةٍ لَا يُسْتَجَابُ لَهَا',
    latin: "Allaahumma innii a'uudzu bika min 'ilmin laa yanfa'u wa min qalbin laa yakhsya'u wa min nafsin laa tasyba'u wa min da'watin laa yustajaabu lahaa",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari ilmu yang tidak bermanfaat, dari hati yang tidak khusyuk, dari jiwa yang tidak pernah merasa puas, dan dari doa yang tidak dikabulkan.',
    category: 'Utama'
  },
  {
    id: 170,
    title: 'Doa Ketika Merasa Ragu dalam Keimanan',
    arabic: 'اٰمَنْتُ بِاللّٰهِ وَرُسُلِهِ',
    latin: "Aamantu billaahi wa rusulih",
    translation: 'Aku beriman kepada Allah dan para rasul-Nya.',
    category: 'Utama'
  },
  {
    id: 171,
    title: 'Doa Ketika Merasa Takut pada Suatu Kaum atau Musuh',
    arabic: 'اَللّٰهُمَّ اكْفِنَاهُمْ بِمَا شِئْتَ',
    latin: "Allaahummak-fiinaahum bimaa syi'ta",
    translation: 'Ya Allah, cukupkanlah kami dari (kejahatan) mereka dengan apa yang Engkau kehendaki.',
    category: 'Utama'
  },
  {
    id: 172,
    title: 'Doa Memohon Husnul Khotimah (Akhir yang Baik)',
    arabic: 'اَللّٰهُمَّ اجْعَلْ خَيْرَ عُمْرِيْ آخِرَهُ وَخَيْرَ عَمَلِيْ خَوَاتِمَهُ وَخَيْرَ أَيَّامِيْ يَوْمَ أَلْقَاكَ فِيْهِ',
    latin: "Allaahummaj-'al khaira 'umrii aakhirahu wa khaira 'amalii khawaatimahu wa khaira ayyaamii yawma alqaaka fiih",
    translation: 'Ya Allah, jadikanlah sebaik-baik umurku adalah pada akhirnya, sebaik-baik amalku adalah pada penutupnya, dan sebaik-baik hariku adalah pada hari ketika aku menemui-Mu.',
    category: 'Utama'
  },
  {
    id: 173,
    title: 'Doa Berlindung dari Hilangnya Nikmat dan Kesehatan',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ وَتَحَوُّلِ عَافِيَتِكَ وَفُجَاءَةِ نِقْمَتِكَ وَجَمِيْعِ سَخَطِكَ',
    latin: "Allaahumma innii a'uudzu bika min zawaali ni'matika wa tahawwuli 'aafiyatika wa fujaa'ati niqmatika wa jamii'i sakhatik",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari hilangnya nikmat-Mu, berubahnya keselamatan dari-Mu, datangnya azab-Mu secara tiba-tiba, dan dari segala kemurkaan-Mu.',
    category: 'Utama'
  },
  {
    id: 174,
    title: 'Doa Sebelum Berhubungan Suami Istri',
    arabic: 'بِسْمِ اللّٰهِ، اَللّٰهُمَّ جَنِّبْنَا الشَّيْطَانَ وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا',
    latin: "Bismillaahi, Allaahumma jannibnasy-syaythaana wa jannibisy-syaythaana maa razaqtanaa",
    translation: 'Dengan nama Allah, Ya Allah jauhkanlah kami dari setan, dan jauhkanlah setan dari apa yang Engkau rezekikan kepada kami (anak).',
    category: 'Harian'
  },
  {
    id: 175,
    title: 'Doa Memohon Kemudahan Persalinan (Istri Melahirkan)',
    arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ الْعَظِيْمُ الْحَلِيْمُ، لَا إِلٰهَ إِلَّا اللّٰهُ رَبُّ الْعَرْشِ الْعَظِيْمِ، لَا إِلٰهَ إِلَّا اللّٰهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيْمِ',
    latin: "Laa ilaaha illallaahul-'azhiimul-haliim, laa ilaaha illallaahu rabbul-'arsyil-'azhiim, laa ilaaha illallaahu rabbus-samaawaati wa rabbul-ardhi wa rabbul-'arsyil-kariim",
    translation: 'Tiada Tuhan selain Allah Yang Maha Agung lagi Maha Penyantun. Tiada Tuhan selain Allah, Tuhan Pemilik Arsy yang agung. Tiada Tuhan selain Allah, Tuhan Pemilik langit, bumi, dan Arsy yang mulia.',
    category: 'Harian'
  },
  {
    id: 176,
    title: 'Doa Saat Menjenguk Bayi Baru Lahir',
    arabic: 'بَارَكَ اللّٰهُ لَكَ فِي الْمَوْهُوْبِ لَكَ، وَشَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ',
    latin: "Baarakallaahu laka fil-mawhuubi lak, wa syakartal-waahib, wa balagha asyuddah, wa ruziqta birrah",
    translation: 'Semoga Allah memberkahimu pada anak yang dianugerahkan kepadamu, semoga engkau bersyukur kepada Sang Pemberi, semoga anak itu tumbuh dewasa, dan semoga engkau dianugerahi baktinya.',
    category: 'Harian'
  },
  {
    id: 177,
    title: 'Doa Ketika Mengalami Kesedihan dan Duka Mendalam',
    arabic: 'اَللّٰهُمَّ إِنِّيْ عَبْدُكَ، اِبْنُ عَبْدِكَ، اِبْنُ أَمَتِكَ، نَاصِيَتِيْ بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ',
    latin: "Allaahumma innii 'abduka, ibnu 'abdika, ibnu amatika, naashiyatii biyadika, maadhin fiyya hukmuka, 'adlun fiyya qadhaa'uk",
    translation: 'Ya Allah, sesungguhnya aku adalah hamba-Mu, anak hamba laki-laki-Mu, dan anak hamba perempuan-Mu. Ubun-ubunku berada di tangan-Mu, keputusan-Mu berlaku padaku, dan ketetapan-Mu adil bagiku.',
    category: 'Utama'
  },
  {
    id: 178,
    title: 'Doa Mengatasi Rasa Sedih Agar Hati Gembira',
    arabic: 'اَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ أَوْ أَنْزَلْتَهُ فِيْ كِتَابِكَ أَنْ تَجْعَلَ الْقُرْاٰنَ رَبِيْعَ قَلْبِيْ وَنُوْرَ صَدْرِيْ',
    latin: "As'aluka bikullis-min huwa laka sammaita bihi nafsaka aw anzaltahu fii kitaabika an taj'alal-qur'aana rabii'a qalbii wa nuura shadrii",
    translation: 'Aku memohon kepada-Mu dengan setiap nama yang Engkau miliki, yang Engkau namakan diri-Mu dengannya atau yang Engkau turunkan dalam kitab-Mu, agar Engkau jadikan Al-Qur\'an sebagai penyejuk hatiku dan cahaya dadaku.',
    category: 'Utama'
  },
  {
    id: 179,
    title: 'Doa Agar Istiqomah Mendirikan Sholat (Nabi Ibrahim)',
    arabic: 'رَبِّ اجْعَلْنِيْ مُقِيْمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِيْ رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    latin: "Rabbij-'al-nii muqiimas-shalaati wa min dzurriyatii rabbanaa wa taqabbal du'aa'",
    translation: 'Ya Tuhanku, jadikanlah aku dan anak cucuku orang-orang yang tetap mendirikan shalat, ya Tuhan kami, perkenankanlah doaku.',
    category: 'Ibadah'
  },
  {
    id: 180,
    title: 'Doa Mohon Ampun atas Kelalaian Diri (Doa Nabi Adam)',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُوْنَنَّ مِنَ الْخَاسِرِيْنَ',
    latin: "Rabbanaa zhalamnaa anfusanaa wa in lam taghfir lanaa wa tarhamnaa lanakuunanna minal-khaasiriin",
    translation: 'Ya Tuhan kami, kami telah menganiaya diri kami sendiri, dan jika Engkau tidak mengampuni kami dan memberi rahmat kepada kami, niscaya pastilah kami termasuk orang-orang yang merugi.',
    category: 'Utama'
  },
  {
    id: 181,
    title: 'Doa Memohon Keadilan dan Jalan Keluar yang Baik',
    arabic: 'رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ وَأَنْتَ خَيْرُ الْفَاتِحِيْنَ',
    latin: "Rabbanaftah bainanaa wa baina qawminaa bil-haqqi wa anta khairul-faatihiin",
    translation: 'Ya Tuhan kami, berilah keputusan antara kami dan kaum kami dengan adil, dan Engkaulah Pemberi keputusan yang terbaik.',
    category: 'Utama'
  },
  {
    id: 182,
    title: 'Doa Agar Terhindar dari Sifat Dengki kepada Sesama Muslim',
    arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِيْنَ سَبَقُوْنَا بِالْإِيْمَانِ وَلَا تَجْعَلْ فِيْ قُلُوْبِنَا غِلًّا لِلَّذِيْنَ اٰمَنُوْا',
    latin: "Rabbanagh-fir lanaa wa li-ikhwaaninalladziina sabaquuna bil-iimaani wa laa taj'al fii quluubinaa ghillal-lilladzii aamanuu",
    translation: 'Ya Tuhan kami, ampunilah kami dan saudara-saudara kami yang telah beriman lebih dulu dari kami, dan janganlah Engkau tanamkan kedengkian dalam hati kami terhadap orang-orang yang beriman.',
    category: 'Utama'
  },
  {
    id: 183,
    title: 'Doa Nabi Sulaiman Memohon Kekayaan dan Ampunan',
    arabic: 'رَبِّ اغْفِرْ لِيْ وَهَبْ لِيْ مُلْكًا لَا يَنْبَغِيْ لِأَحَدٍ مِنْ بَعْدِيْ إِنَّكَ أَنْتَ الْوَهَّابُ',
    latin: "Rabbigh-firlii wa hab lii mulkan laa yanbaghii li-ahadin min ba'dii innaka antal-wahhaab",
    translation: 'Ya Tuhanku, ampunilah aku dan anugerahkanlah kepadaku kerajaan yang tidak dimiliki oleh seorang pun sesudahku, sesungguhnya Engkaulah Yang Maha Pemberi.',
    category: 'Utama'
  },
  {
    id: 184,
    title: 'Doa Nabi Sulaiman Saat Mensyukuri Nikmat Allah',
    arabic: 'رَبِّ أَوْزِعْنِيْ أَنْ أَشْكُرَ نِعْمَتِكَ الَّتِيْ أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ',
    latin: "Rabbi awzi'-nii an asykura ni'matakallatii an'amta 'alayya wa 'alaa waalidayya wa an a'mala shaalihan tardhaahu",
    translation: 'Ya Tuhanku, anugerahkanlah aku ilham untuk tetap mensyukuri nikmat-Mu yang telah Engkau anugerahkan kepadaku dan kepada kedua orang tuaku dan agar aku mengerjakan kebajikan yang Engkau ridhai.',
    category: 'Utama'
  },
  {
    id: 185,
    title: 'Doa Nabi Zakaria Memohon Anak dan Keturunan',
    arabic: 'رَبِّ لَا تَذَرْنِيْ فَرْدًا وَأَنْتَ خَيْرُ الْوٰرِثِيْنَ',
    latin: "Rabbi laa tadzarnii fardan wa anta khairul-waaritsiin",
    translation: 'Ya Tuhanku, janganlah Engkau biarkan aku hidup seorang diri (tanpa keturunan) dan Engkaulah ahli waris yang terbaik.',
    category: 'Utama'
  },
  {
    id: 186,
    title: 'Doa Nabi Luth Memohon Keselamatan dari Lingkungan yang Buruk',
    arabic: 'رَبِّ نَجِّنِيْ وَأَهْلِيْ مِمَّا يَعْمَلُوْنَ',
    latin: "Rabbi najjinii wa ahlii mimmaa ya'maluun",
    translation: 'Ya Tuhanku, selamatkanlah aku dan keluargaku dari (akibat) perbuatan yang mereka kerjakan.',
    category: 'Utama'
  },
  {
    id: 187,
    title: 'Doa Memohon Kelapangan Rezeki di Hari Tua',
    arabic: 'اَللّٰهُمَّ اجْعَلْ وَاسِعَ رِزْقِكَ عَلَيَّ عِنْدَ كِبَرِ سِنِّيْ وَانْقِطَاعِ عُمُرِيْ',
    latin: "Allaahummaj-'al waasi'a rizqika 'alayya 'inda kibari sinnii wanqithaa'i 'umurii",
    translation: 'Ya Allah, jadikanlah rezeki-Mu yang paling luas bagiku saat usiaku telah senja dan saat umurku hampir berakhir.',
    category: 'Utama'
  },
  {
    id: 188,
    title: 'Doa Menyembelih Hewan Qurban',
    arabic: 'بِسْمِ اللّٰهِ وَاللّٰهُ أَكْبَرُ، اَللّٰهُمَّ هٰذَا مِنْكَ وَإِلَيْكَ، اَللّٰهُمَّ تَقَبَّلْ مِنِّيْ',
    latin: "Bismillaahi wallaahu akbar, Allaahumma haadzaa minka wa ilaika, Allaahumma taqabbal minnii",
    translation: 'Dengan nama Allah dan Allah Maha Besar. Ya Allah, ini (hewan qurban) adalah nikmat dari-Mu dan dipersembahkan untuk-Mu. Ya Allah, terimalah dariku.',
    category: 'Aktivitas'
  },
  {
    id: 189,
    title: 'Doa Ketika Hendak Membaca Al-Qur\'an',
    arabic: 'اَللّٰهُمَّ افْتَحْ عَلَيَّ حِكْمَتَكَ وَانْشُرْ عَلَيَّ رَحْمَتَكَ مِنْ خَزَائِنِ رَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِيْنَ',
    latin: "Allaahummaftah 'alayya hikmataka wansyur 'alayya rahmataka min khazaa'ini rahmatika yaa arhamar-raahimiin",
    translation: 'Ya Allah, bukakanlah pintu hikmah-Mu untukku dan bentangkanlah rahmat-Mu kepadaku dari perbendaharaan rahmat-Mu, wahai Dzat Yang Maha Penyayang.',
    category: 'Harian'
  },
  {
    id: 190,
    title: 'Doa Khatam Al-Qur\'an (Doa Setelah Membaca Qur\'an)',
    arabic: 'اَللّٰهُمَّ ارْحَمْنِيْ بِالْقُرْآنِ، وَاجْعَلْهُ لِيْ إِمَامًا وَنُوْرًا وَهُدًى وَرَحْمَةً',
    latin: "Allaahummar-hamnii bil-qur'aan, waj-'alhu lii imaaman wa nuuran wa hudan wa rahmah",
    translation: 'Ya Allah, sayangilah aku dengan Al-Qur\'an. Jadikanlah ia bagiku sebagai pemimpin, cahaya, petunjuk, dan rahmat.',
    category: 'Harian'
  },
  {
    id: 191,
    title: 'Doa Memohon Pertolongan dari Kelilit Utang dan Kemiskinan',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوْذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوْذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ',
    latin: "Allaahumma innii a'uudzu bika minal-hammi wal-hazani wa a'uudzu bika minal-'ajzi wal-kasali wa a'uudzu bika minal-jubni wal-bukhli",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari keluh kesah dan kesedihan, aku berlindung kepada-Mu dari kelemahan dan kemalasan, dan aku berlindung kepada-Mu dari sifat penakut dan kikir.',
    category: 'Utama'
  },
  {
    id: 192,
    title: 'Doa Zikir Pembuka Segala Pintu Kebaikan',
    arabic: 'يَا حَيُّ يَا قَيُّوْمُ بِرَحْمَتِكَ أَسْتَغِيْثُ، أَصْلِحْ لِيْ شَأْنِيْ كُلَّهُ وَلَا تَكِلْنِيْ إِلَى نَفْسِيْ طَرْفَةَ عَيْنٍ',
    latin: "Yaa hayyu yaa qayyuumu birahmatika astaghiitsu, ashlih lii sya'nii kullahu wa laa takilnii ilaa nafsii tharfata 'ayn",
    translation: 'Wahai Dzat yang Maha Hidup lagi Maha Berdiri Sendiri, dengan rahmat-Mu aku memohon pertolongan. Perbaikilah segala urusanku dan janganlah Engkau serahkan aku kepada diriku sendiri walau sekejap mata.',
    category: 'Pagi & Petang'
  },
  {
    id: 193,
    title: 'Doa Memohon Ampunan dan Perlindungan Hari Kiamat',
    arabic: 'رَبَّنَا اٰتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: "Rabbanaa aatinaa fid-dunyaa hasanatan wa fil-aakhirati hasanatan wa qinaa 'adzaaban-naar",
    translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    category: 'Utama'
  },
  {
    id: 194,
    title: 'Doa Agar Hati Dilembutkan dan Dijauhkan dari Kekerasan Hati',
    arabic: 'اَللّٰهُمَّ يَا مُلَيِّنَ الْحَدِيْدِ لِدَاوُدَ عَلَيْهِ السَّلَامُ لَيِّنْ لِيْ قَلْبَهُ',
    latin: "Allaahumma yaa mulayyinah-hadiidi li-daawuda 'alaihis-salaam layyin lii qalbah",
    translation: 'Ya Allah, wahai Dzat yang melunakkan besi untuk Nabi Daud alaihissalam, lunakkanlah hatinya untukku.',
    category: 'Harian'
  },
  {
    id: 195,
    title: 'Doa Ketika Selesai Makan Makanan yang Lezat',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِيْنَ',
    latin: "Al-hamdu lillaahilladzii ath'amanaa wa saqaanaa wa ja'alanaa muslimiin",
    translation: 'Segala puji bagi Allah yang telah memberi kami makan dan minum, serta menjadikan kami termasuk golongan orang-orang muslim.',
    category: 'Harian'
  },
  {
    id: 196,
    title: 'Doa Memohon Jiwa yang Terhindar dari Penyakit Hati',
    arabic: 'اَللّٰهُمَّ اٰتِ نَفْسِيْ تَقْوَاهَا وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا أَنْتَ وَلِيُّهَا وَمَوْلَاهَا',
    latin: "Allaahumma aati nafsii taqwaahaa wa zakkihaa anta khairu man zakkaahaa anta waliyyuhaa wa mawlaahaa",
    translation: 'Ya Allah, berikanlah ketakwaan pada jiwaku, dan bersihkanlah ia, Engkaulah sebaik-baik yang membersihkannya, Engkaulah Pelindung dan Penolongnya.',
    category: 'Utama'
  },
  {
    id: 197,
    title: 'Doa Memohon Dimudahkan Urusan & Diberi Petunjuk (Ashabul Kahfi)',
    arabic: 'رَبَّنَا اٰتِنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
    latin: "Rabbanaa aatinaa min ladunka rahmatan wa hayyi' lanaa min amrinaa rasyadaa",
    translation: 'Ya Tuhan kami, berikanlah rahmat kepada kami dari sisi-Mu dan sempurnakanlah petunjuk yang lurus bagi kami dalam urusan kami.',
    category: 'Utama'
  },
  {
    id: 198,
    title: 'Doa Nabi Ibrahim Agar Negeri Aman & Dijauhkan dari Berhala',
    arabic: 'رَبِّ اجْعَلْ هٰذَا الْبَلَدَ آمِنًا وَاجْنُبْنِيْ وَبَنِيَّ أَنْ نَعْبُدَ الْأَصْنَامَ',
    latin: "Rabbij-'al haadzal-balada aaminan wajnubnii wa baniyya an na'budal-ashnaam",
    translation: 'Ya Tuhanku, jadikanlah negeri ini negeri yang aman, dan jauhkanlah aku beserta anak cucuku daripada menyembah berhala-berhala.',
    category: 'Utama'
  },
  {
    id: 199,
    title: 'Doa Nabi Ibrahim Memohon Keberkahan Negeri dan Rezeki Buah-buahan',
    arabic: 'رَبَّنَا إِنِّيْ أَسْأَلُكَ مِنْ ذُرِّيَّتِيْ بِوَادٍ غَيْرِ ذِيْ زَرْعٍ عِنْدَ بَيْتِكَ الْمُحَرَّمِ رَبَّنَا لِيُقِيْمُوا الصَّلَاةَ فَاجْعَلْ أَفْئِدَةً مِنَ النَّاسِ تَهْوِيْ إِلَيْهِمْ وَارْزُقْهُمْ مِنَ الثَّمَرَاتِ لَعَلَّهُمْ يَشْكُرُوْنَ',
    latin: "Rabbanaa innii askantu min dzurriyyatii biwaadin ghairi dziizar-'in 'inda baitikal-muharrami rabbanaa liyuqiimush-shalaata faj-'al af'idatan minan-naasi tahwii ilaihim warzuqhum minats-tsamaraati la'allahum yasykuroon",
    translation: 'Ya Tuhan kami, sesungguhnya aku telah menempatkan sebagian keturunanku di lembah yang tidak mempunyai tanam-tanaman di dekat rumah Engkau (Baitullah) yang dihormati, ya Tuhan kami (yang demikian itu) agar mereka mendirikan shalat, maka jadikanlah hati sebagian manusia cenderung kepada mereka dan rezekikanlah mereka dari buah-buahan, mudah-mudahan mereka bersyukur.',
    category: 'Utama'
  },
  {
    id: 200,
    title: 'Doa Nabi Yusuf Memohon Wafat dalam Keadaan Islam',
    arabic: 'رَبِّ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ أَنْتَ وَلِيِّيْ فِي الدُّنْيَا وَالْآخِرَةِ تَوَفَّنِيْ مُسْلِمًا وَأَلْحِقْنِيْ بِالصَّالِحِيْنَ',
    latin: "Rabbi faathiras-samaawaati wal-ardhi anta waliyyii fid-dunyaa wal-aakhirah, tawaffanii musliman wa alhiqnii bish-shaalihiin",
    translation: 'Ya Tuhanku, Pencipta langit dan bumi. Engkaulah Pelindungku di dunia dan di akhirat, wafatkanlah aku dalam keadaan Islam dan gabungkanlah aku dengan orang-orang yang shalih.',
    category: 'Utama'
  },
  {
    id: 201,
    title: 'Doa Nabi Syuaib Berserah Diri Kepada Allah',
    arabic: 'عَلَى اللّٰهِ تَوَكَّلْنَا رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ وَأَنْتَ خَيْرُ الْفَاتِحِيْنَ',
    latin: "'Alallaahi tawakkalnaa, rabbanaftah bainanaa wa baina qawminaa bil-haqqi wa anta khairul-faatihiin",
    translation: 'Hanya kepada Allah kami bertawakkal. Ya Tuhan kami, berilah keputusan antara kami dan kaum kami dengan adil, dan Engkaulah Pemberi keputusan yang terbaik.',
    category: 'Utama'
  },
  {
    id: 202,
    title: 'Doa Memohon Kesabaran dan Kemenangan (Tentara Thalut)',
    arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِيْنَ',
    latin: "Rabbanaa afrigh 'alainaa sabran wa tsabbit aqdaamanaa wansurnaa 'alal-qawmil-kaafiriin",
    translation: 'Ya Tuhan kami, tuangkanlah kesabaran atas diri kami, dan kokohkanlah pendirian kami dan tolonglah kami terhadap orang-orang kafir.',
    category: 'Utama'
  },
  {
    id: 203,
    title: 'Doa Ahli Sihir Firaun yang Bertaubat (Wafat Husnul Khotimah)',
    arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِيْنَ',
    latin: "Rabbanaa afrigh 'alainaa sabran wa tawaffanaa muslimiin",
    translation: 'Ya Tuhan kami, limpahkanlah kesabaran kepada kami dan wafatkanlah kami dalam keadaan berserah diri (kepada-Mu).',
    category: 'Utama'
  },
  {
    id: 204,
    title: 'Doa Perlindungan dari Teman yang Bermuka Dua / Makar',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ خَلِيْلٍ مَاكِرٍ عَيْنُهُ تَرَانِيْ وَقَلْبُهُ يَرْعَانِيْ، إِنْ رَأَى حَسَنَةً دَفَنَهَا وَإِنْ رأَى سَيِّئَةً أَشَاعَهَا',
    latin: "Allaahumma innii a'uudzu bika min khaliilin maakirin 'aynuhu taraanii wa qalbuhu yar'aanii, in ra'aa hasanatan dafanahaa wa in ra'aa sayyi'atan asyaa'ahaa",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari teman dekat yang makar, matanya melihatku tetapi hatinya mengawasi/mencari kelemahanku, jika melihat kebaikanku ia menyembunyikannya, dan jika melihat keburukanku ia menyebarkannya.',
    category: 'Utama'
  },
  {
    id: 205,
    title: 'Doa Memohon Ampunan dan Rahmat Istimewa Allah',
    arabic: 'رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنْتَ خَيْرُ الرَّاحِمِيْنَ',
    latin: "Rabbanaa aamannaa faghfir lanaa warhamnaa wa anta khairur-raahimiin",
    translation: 'Ya Tuhan kami, kami telah beriman, maka ampunilah kami dan berilah kami rahmat dan Engkaulah Pemberi rahmat Yang Paling Baik.',
    category: 'Utama'
  },
  {
    id: 206,
    title: 'Doa Perlindungan dari Syirik Kecil (Riya\' / Pamer)',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ',
    latin: "Allaahumma innii a'uudzu bika an usyrika bika wa ana a'lamu wa astaghfiruka limaa laa a'lamu",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari menyekutukan-Mu sedangkan aku mengetahuinya, dan aku memohon ampunan kepada-Mu dari apa yang tidak aku ketahui.',
    category: 'Utama'
  },
  {
    id: 207,
    title: 'Doa Diberikan Berkah Pendengaran, Penglihatan, dan Kesehatan',
    arabic: 'اَللّٰهُمَّ مَتِّعْنِيْ بِسَمْعِيْ وَبَصَرِيْ وَاجْعَلْهُمَا الْوَارِثَ مِنِّيْ وَانْصُرْنِيْ عَلَى مَنْ يَظْلِمُنِيْ',
    latin: "Allaahumma matti'nii bisam'ii wa basharii waj-'alhumal-waaritsa minnii wansurnii 'alaa man yazhlimunii",
    translation: 'Ya Allah, berikanlah kemanfaatan bagiku pada pendengaran dan penglihatanku, jadikanlah keduanya sebagai pewaris dariku (tetap sehat sampai akhir hayat), dan tolonglah aku terhadap orang yang mendzalimiku.',
    category: 'Utama'
  },
  {
    id: 208,
    title: 'Doa Pasrah Menyerahkan Segala Keputusan Penting kepada Allah',
    arabic: 'اَللّٰهُمَّ خِرْ لِيْ وَاخْتَرْ لِيْ وَلَا تَكِلْنِيْ إِلَى اخْتِيَارِيْ',
    latin: "Allaahumma khir lii wakhtar lii wa laa takilnii ilaa-khtiyaarii",
    translation: 'Ya Allah, pilihkanlah untukku dan tentukanlah yang terbaik bagiku, serta janganlah Engkau serahkan urusanku kepada pilihanku sendiri.',
    category: 'Harian'
  },
  {
    id: 209,
    title: 'Doa Keberkahan dalam Jual Beli / Transaksi Muamalah',
    arabic: 'بَارَكَ اللّٰهُ لَكَ فِيْ أَهْلِكَ وَمَالِكَ',
    latin: "Baarakallaahu laka fii ahlika wa maalika",
    translation: 'Semoga Allah melimpahkan keberkahan kepadamu dalam keluarga dan harta bendamu.',
    category: 'Aktivitas'
  },
  {
    id: 210,
    title: 'Doa Memohon Dilindungi dari Sifat Lalai (Ghaflah)',
    arabic: 'اَللّٰهُمَّ لَا تَجْعَلْنَا مَنِ الْغَافِلِيْنَ وَنَبِّهْنَا لِطَاعَتِكَ',
    latin: "Allaahumma laa taj-'alnaa minal-ghaafiliina wa nabbihnaa lithaa'atik",
    translation: 'Ya Allah, janganlah Engkau jadikan kami termasuk orang-orang yang lalai, dan bangunkanlah kami untuk selalu taat kepada-Mu.',
    category: 'Utama'
  },
  {
    id: 211,
    title: 'Doa Pembersih Jiwa dari Sifat Munafik dan Riya\'',
    arabic: 'اَللّٰهُمَّ طَهِّرْ قَلْبِيْ مِنَ النِّافَاقِ، وَعَمَلِيْ مِنَ الرِّيَاءِ، وَلِسَانِيْ مِنَ الْكَذِبِ',
    latin: "Allaahumma thahhir qalbii minan-nifaaqi, wa 'amalii minar-riyaa'i, wa lisaanii minal-kadzibi",
    translation: 'Ya Allah, bersihkanlah hatiku dari kemunafikan, amalku dari riya\' (pamer), dan lisanku dari kebohongan.',
    category: 'Utama'
  },
  {
    id: 212,
    title: 'Doa Agar Dicintai oleh Allah dan Orang-orang Shalih',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ وَالْعَمَلَ الَّذِيْ يُبَلِّغُنِيْ حُبَّكَ',
    latin: "Allaahumma innii as'aluka hubbaka wa hubba man yuhibbuka wal-'amalalladzii yuballighunii hubbak",
    translation: 'Ya Allah, sesungguhnya aku memohon cinta-Mu, cinta orang-orang yang mencintai-Mu, dan amal perbuatan yang dapat mengantarkan aku untuk meraih cinta-Mu.',
    category: 'Utama'
  },
  {
    id: 213,
    title: 'Doa Perlindungan dari Tetangga yang Jahat',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ جَارِ السُّوْءِ فِيْ دَارِ الْمُقَامَةِ، فَإِنَّ جَارَ الْبَادِيَةِ يَتَحَوَّلُ',
    latin: "Allaahumma innii a'uudzu bika min jaaris-suu'i fii daaril-muqaamati, fa-inna jaaral-baadiyati yatahawwal",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari tetangga yang jahat di lingkungan tempat tinggal tetapku, karena tetangga di padang pasir (nomaden) akan berpindah.',
    category: 'Utama'
  },
  {
    id: 214,
    title: 'Doa Perlindungan dari Setan Saat Masuk Rumah',
    arabic: 'بِسْمِ اللّٰهِ وَلَجْنَا، وَبِسْمِ اللّٰهِ خَرَجْنَا، وَعَلَى اللّٰهِ رَبِّنَا تَوَكَّلْنَا',
    latin: "Bismillaahi walajnaa, wa bismillaahi kharajnaa, wa 'alallaahi rabbinaa tawakkalnaa",
    translation: 'Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan kepada Allah Tuhan kami, kami bertawakkal.',
    category: 'Aktivitas'
  },
  {
    id: 215,
    title: 'Doa Memohon Kemudahan Menjalankan Kebaikan & Ibadah (Sesudah Sholat)',
    arabic: 'اَللّٰهُمَّ أَعِنِّيْ عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    latin: "Allaahumma a'innii 'alaa dzikrika wa syukrika wa husni 'ibaadatik",
    translation: 'Ya Allah, bantulah aku untuk selalu mengingat-Mu, bersyukur kepada-Mu, dan beribadah dengan baik kepada-Mu.',
    category: 'Ibadah'
  },
  {
    id: 216,
    title: 'Doa Memohon Keteguhan Hati di Atas Hidayah (Doa Hijrah)',
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوْبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ',
    latin: "Rabbanaa laa tuzigh quluubanaa ba'da idz hadaitanaa wa hab lanaa min ladunka rahmatan innaka antal-wahhaab",
    translation: 'Ya Tuhan kami, janganlah Engkau jadikan hati kami condong kepada kesesatan sesudah Engkau beri petunjuk kepada kami, dan karuniakanlah kepada kami rahmat dari sisi-Mu, karena sesungguhnya Engkau-lah Maha Pemberi (karunia).',
    category: 'Utama'
  },
  {
    id: 217,
    title: 'Doa Memohon Pengganti yang Lebih Baik atas Kehilangan / Musibah',
    arabic: 'اَللّٰهُمَّ أْجُرْنِيْ فِيْ مُصِيْبَتِيْ وَأَخْلِفْ لِيْ خَيْرًا مِنْهَا',
    latin: "Allaahumma'-jurnii fii mushiibatii wa akhlif lii khairan minhaa",
    translation: 'Ya Allah, berilah pahala kepadaku dalam musibahku ini dan gantilah untukku dengan yang lebih baik darinya.',
    category: 'Utama'
  },
  {
    id: 218,
    title: 'Doa Mohon Perlindungan dari Siksa Kubur',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِ',
    latin: "Allaahumma innii a'uudzu bika min 'adzaabil-qabr",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari azab kubur.',
    category: 'Utama'
  },
  {
    id: 219,
    title: 'Doa Keberkahan Bercocok Tanam / Berkebun',
    arabic: 'اَللّٰهُمَّ اجْعَلْهُ حَبًّا مُبَارَكًا وَأَنْبِتْهُ نَبَاتًا حَسَنًا',
    latin: "Allaahummaj-'alhu habban mubaarakan wa anbit-hu nabaatan hasanaa",
    translation: 'Ya Allah, jadikanlah benih ini benih yang berkah dan tumbuhkanlah ia menjadi tanaman yang subur dan baik.',
    category: 'Aktivitas'
  },
  {
    id: 220,
    title: 'Doa Memohon Kejujuran dalam Perkataan dan Perbuatan',
    arabic: 'اَللّٰهُمَّ اجْعَلْنِيْ صَادِقًا فِيْ قَوْلِيْ وَعَمَلِيْ',
    latin: "Allaahummaj-'alnii shaadiqan fii qawlii wa 'amalii",
    translation: 'Ya Allah, jadikanlah aku orang yang jujur dalam ucapan dan perbuatanku.',
    category: 'Utama'
  },
  {
    id: 221,
    title: 'Doa Perlindungan dari Kedengkian dan Kejahatan Makhluk',
    arabic: 'اَللّٰهُمَّ اكْفِنِيْ شَرَّ حَاسِدٍ إِذَا حَسَدَ وَشَرَّ كُلِّ ذِيْ شَرٍّ',
    latin: "Allaahummak-finii syarra haasidin idzaa hasad wa syarra kulli dzii syarr",
    translation: 'Ya Allah, lindungilah aku dari kejahatan pendengki bila ia dengki, dan dari kejahatan setiap orang yang berniat jahat.',
    category: 'Utama'
  },
  {
    id: 222,
    title: 'Doa Kafaratul Majelis (Doa Penutup Pertemuan / Majelis)',
    arabic: 'سُبْحَانَكَ اللّٰهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا أَنْتَ، أَسْتَغِفِرُكَ وَأَتُوْبُ إِلَيْكَ',
    latin: "Subhaanakallaahumma wa bihamdika, asyhadu alla ilaaha illa anta, astaghfiruka wa atuubu ilaik",
    translation: 'Maha Suci Engkau ya Allah, dengan memuji-Mu aku bersaksi bahwa tiada Tuhan selain Engkau, aku memohon ampunan-Mu dan aku bertaubat kepada-Mu.',
    category: 'Harian'
  },
  {
    id: 223,
    title: 'Doa Ketika Hendak Memasuki Masjidil Haram (Ka\'bah)',
    arabic: 'اَللّٰهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ فَحَيِّنَا رَبَّنَا بِالسَّلَامِ وَأَدْخِلْنَا الْجَنَّةَ دَارَ السَّلَامِ',
    latin: "Allaahumma antas-salaamu wa minkas-salaamu fahayyinaa rabbanaa bis-salaami wa adkhilnal-jannata daaras-salaam",
    translation: 'Ya Allah, Engkaulah Dzat yang memberi keselamatan, dan dari-Mulah keselamatan, maka hidupkanlah kami dengan keselamatan wahai Tuhan kami, dan masukkanlah kami ke dalam surga negeri keselamatan.',
    category: 'Ibadah'
  },
  {
    id: 224,
    title: 'Doa Sayyidul Istighfar (Rajanya Memohon Ampunan)',
    arabic: 'اَللّٰهُمَّ أَنْتَ رَبِّيْ لَا إِلٰهَ إِلَّا أَنْتَ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
    latin: "Allaahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa ana 'abduka, wa ana 'alaa 'ahdika wa wa'dika mas-tatha'tu",
    translation: 'Ya Allah, Engkaulah Tuhanku, tiada Tuhan selain Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu, dan aku berada di atas janji dan ketentuan-Mu semampuku.',
    category: 'Utama'
  },
  {
    id: 225,
    title: 'Doa Sayyidul Istighfar (Pengakuan Dosa & Ampunan)',
    arabic: 'أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ',
    latin: "A'uudzu bika min syarri maa shana'tu, abuu'u laka bini'matika 'alayya, wa abuu'u bidzanbii faghfir lii fa-innahu laa yaghfirudh-dhunuuba illaa anta",
    translation: 'Aku berlindung kepada-Mu dari keburukan apa yang aku perbuat, aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku, karena sesungguhnya tiada yang dapat mengampuni dosa kecuali Engkau.',
    category: 'Utama'
  },
  {
    id: 226,
    title: 'Doa Setelah Mendengar Adzan Berkumandang',
    arabic: 'اَللّٰهُمَّ رَبَّ هٰذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، اٰتِ مُحَمَّدًا الْوَسِيْلَةَ وَالْفَضِيْلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُوْدًا الَّذِيْ وَعَدْتَهُ',
    latin: "Allaahumma rabba haadzihid-da'watit-taammah, was-shalaatil-qaa'imah, aati muhammadanil-wasiilata wal-fadhiilah, wab-'atshu maqaamam-mahmuudanilladzii wa'adtah",
    translation: 'Ya Allah, Tuhan pemilik seruan yang sempurna ini, dan shalat yang akan didirikan, berilah Nabi Muhammad wasilah (perantara) dan keutamaan, dan tempatkanlah dia di tempat yang terpuji yang telah Engkau janjikan.',
    category: 'Ibadah'
  },
  {
    id: 227,
    title: 'Doa Ketika Melakukan Perjalanan Laut (Naik Kapal / Perahu)',
    arabic: 'بِسْمِ اللّٰهِ مَجْرٰهَا وَمُرْسٰهَا إِنَّ رَبِّيْ لَغَفُوْرٌ رَحِيْمٌ',
    latin: "Bismillaahi majrehaa wa mursaahaa inna rabbii laghafuurur-rahiim",
    translation: 'Dengan nama Allah pada waktu berlayar dan berlabuhnya. Sesungguhnya Tuhanku benar-benar Maha Pengampun lagi Maha Penyayang.',
    category: 'Aktivitas'
  },
  {
    id: 228,
    title: 'Doa Ketika Memasuki Rumah Kosong / Tanpa Penghuni',
    arabic: 'اَلسَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللّٰهِ الصَّالِحِيْنَ',
    latin: "As-salaamu 'alainaa wa 'alaa 'ibaadillaahis-shaalihiin",
    translation: 'Semoga keselamatan tercurah kepada kami dan kepada hamba-hamba Allah yang shalih.',
    category: 'Aktivitas'
  },
  {
    id: 229,
    title: 'Doa Mendengar Iqamah Berkumandang',
    arabic: 'أَقَامَهَا اللّٰهُ وَأَدَامَهَا مَا دَامَتِ السَّمَاوَاتُ وَالْأَرْضُ',
    latin: "Aqaamahaallaahu wa adaamahaa maa daamatis-samaawaatu wal-ardh",
    translation: 'Semoga Allah mendirikannya (shalat) dan mengekalkannya selama langit dan bumi masih ada.',
    category: 'Ibadah'
  },
  {
    id: 230,
    title: 'Doa Ketika Menghadapi Orang yang Sedang Marah Besar',
    arabic: 'اَللّٰهُمَّ رَبَّ نَبِيِّنَا مُحَمَّدٍ اغْفِرْ لِيْ ذَنْبِيْ وَأَذْهِبْ غَيْظَ قَلْبِيْ وَأَجِرْنِيْ مِنْ مُضِلَّاتِ الْفِتَنِ',
    latin: "Allaahumma rabba nabiyyinaa muhammadigh-fir lii dzanbii wa adzhib ghaizha qalbii wa ajirnii min mudhillaatil-fitan",
    translation: 'Ya Allah, Tuhan Nabi kami Muhammad, ampunilah dosaku, hilangkanlah kemarahan hatiku, dan selamatkanlah aku dari fitnah-fitnah yang menyesatkan.',
    category: 'Harian'
  },
  {
    id: 231,
    title: 'Doa Perlindungan dari Kematian yang Buruk (Kecelakaan, Tenggelam, Kebakaran)',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ التَّرَدِّيْ وَالْهَدْمِ وَالْغَرَقِ وَالْحَرَقِ',
    latin: "Allaahumma innii a'uudzu bika minat-taraddii wal-hadmi wal-gharaqi wal-haraqi",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari jatuh dari tempat tinggi, tertimpa runtuhan, tenggelam, dan terbakar.',
    category: 'Utama'
  },
  {
    id: 232,
    title: 'Doa Memohon Dipermudah Saat Sakaratul Maut',
    arabic: 'اَللّٰهُمَّ أَعِنِّيْ عَلَى غَمَرَاتِ الْمَوْتِ وَسَكَرَاتِ الْمَوْتِ',
    latin: "Allaahumma a'innii 'alaa ghamaraatil-mawti wa sakaraatil-mawt",
    translation: 'Ya Allah, tolonglah aku dalam menghadapi kepedihan mati dan sakaratul maut.',
    category: 'Utama'
  },
  {
    id: 233,
    title: 'Doa Apabila Kehilangan Barang Berharga (Mohon Dikembalikan)',
    arabic: 'اَللّٰهُمَّ يَا جَامِعَ النَّاسِ لِيَوْمٍ لَا رَيْبَ فِيْهِ، اِجْمَعْ عَلَيَّ ضَالَّتِيْ',
    latin: "Allaahumma yaa jaami'an-naasi liyawmin laa rayba fiihi, ijma' 'alayya dhaallatii",
    translation: 'Ya Allah, wahai Dzat yang mengumpulkan manusia pada hari yang tidak ada keraguan padanya, kembalikanlah barangku yang hilang kepadaku.',
    category: 'Harian'
  },
  {
    id: 234,
    title: 'Doa Memohon Petunjuk Kebaikan dan Ketepatan Langkah',
    arabic: 'اَللّٰهُمَّ اهْدِنِيْ وَسَدِّدْنِيْ',
    latin: "Allaahummahdinii wa saddidnii",
    translation: 'Ya Allah, berilah aku petunjuk dan tepatkanlah langkah-langkahku.',
    category: 'Utama'
  },
  {
    id: 235,
    title: 'Doa Ketika Mendengar Kabar Kematian Sesama Muslim',
    arabic: 'إِنَّا لِلّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُوْنَ، اَللّٰهُمَّ اكْتُبْهُ عِنْدَكَ مِنَ الْمُحْسِنِيْنَ',
    latin: "Innaa lillaahi wa innaa ilaihi raaji'uun, Allaahummak-tubhu 'indaka minal-muhsiniin",
    translation: 'Sesungguhnya kami adalah milik Allah dan sesungguhnya hanya kepada-Nyalah kami kembali. Ya Allah, catatlah dia di sisi-Mu termasuk golongan orang-orang yang berbuat kebaikan.',
    category: 'Harian'
  },
  {
    id: 236,
    title: 'Doa Memohon Dilimpahi Rezeki yang Tak Terduga (Maidah)',
    arabic: 'رَبَّنَا أَنْزِلْ عَلَيْنَا مَائِدَةً مِنَ السَّمَاءِ تَكُوْنُ لَنَا عِيْدًا لِأَوَّلِنَا وَآخِرِنَا وَآيَةً مِنْكَ وَارْزُقْنَا وَأَنْتَ خَيْرُ الرَّازِقِيْنَ',
    latin: "Rabbanaa anzil 'alainaa maa'idatan minas-samaa'i takoonu lanaa 'iidan li-awwalinaa wa aakhirinaa wa aayatan minka warzuqnaa wa anta khairur-raaziqiin",
    translation: 'Ya Tuhan kami, turunkanlah kepada kami suatu hidangan dari langit (yang hari turunnya) akan menjadi hari raya bagi kami, yaitu bagi orang-orang yang bersama kami dan yang datang sesudah kami, dan menjadi tanda bagi kekuasaan-Mu; berilah kami rezeki, dan Engkaulah Pemberi rezeki yang paling baik.',
    category: 'Utama'
  },
  {
    id: 237,
    title: 'Doa Perlindungan dari Pemimpin yang Zhalim dan Sewenang-wenang',
    arabic: 'اَللّٰهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَرَبَّ الْعَرْشِ الْعَظِيْمِ، كُنْ لِيْ جَارًا مِنْ فُلَانِ بْنِ فُلَانٍ',
    latin: "Allaahumma rabbas-samaawaatis-sab'i wa rabbal-'arsyil-'azhiimi, kun lii jaaran min fulaanib-ni fulaan",
    translation: 'Ya Allah, Tuhan langit yang tujuh dan Tuhan Arsy yang agung, jadilah Penolong bagiku dari si fulan anak si fulan (sebutkan namanya) agar ia tidak menyiksaku atau melampaui batas terhadapku.',
    category: 'Utama'
  },
  {
    id: 238,
    title: 'Doa Memohon Hati yang Bersih dan Dijauhkan dari Su\'udzon',
    arabic: 'اَللّٰهُمَّ اجْعَلْ سَرِيْرَتِيْ خَيْرًا مِنْ عَلَانِيَتِيْ وَاجْعَلْ عَلَانِيَتِيْ صَالِحَةً',
    latin: "Allaahummaj-'al sariiratii khairan min 'alaaniyatii waj-'al 'alaaniyatii shaalihah",
    translation: 'Ya Allah, jadikanlah batin (hatiku) lebih baik daripada lahiriahku, dan jadikanlah lahiriahku selalu shalih (baik).',
    category: 'Utama'
  },
  {
    id: 239,
    title: 'Doa Ketika Melihat Hilal (Mulai Bulan Baru Hijriah)',
    arabic: 'اَللّٰهُ أَكْبَرُ، اَللّٰهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيْمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ',
    latin: "Allaahu Akbar, Allaahumma ahillahu 'alainaa bil-amni wal-iimaani was-salaamati wal-islaam",
    translation: 'Allah Maha Besar. Ya Allah, tampakkanlah hilal itu kepada kami dengan membawa keamanan, keimanan, keselamatan, dan Islam.',
    category: 'Alam'
  },
  {
    id: 240,
    title: 'Doa Ketika Hendak Mandi Wajib / Mandi Besar',
    arabic: 'نَوَيْتُ الْغُسْلَ لِرَفْعِ الْحَدَثِ الْأَكْبَرِ عَنِ الْجَسَدِ كُلِّهِ فَرْضًا لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla liraf'il-hadatsil-akbari 'anill-jasadi kullihi fardhan lillaahi ta'aalaa",
    translation: 'Aku niat mandi untuk menghilangkan hadas besar dari seluruh tubuhku, fardhu karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 241,
    title: 'Doa Ketika Merasa Takut pada Setan / Gangguan Jin di Suatu Tempat',
    arabic: 'أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ الَّتِيْ لَا يُجَاوِزُهُنَّ بَرٌّ وَلَا فَاجِرٌ مِنْ شَرِّ مَا خَلَقَ',
    latin: "A'uudzu bikalimaatillaahit-taammaatillatii laa yujaawizuhunna barrun wa laa faajirun min syarri maa khalaq",
    translation: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna, yang tidak dapat ditembus oleh orang baik maupun orang jahat, dari kejahatan apa yang Dia ciptakan.',
    category: 'Aktivitas'
  },
  {
    id: 242,
    title: 'Doa Agar Diberi Hati yang Selalu Bersyukur atas Nikmat',
    arabic: 'رَبِّ أَوْزِعْنِيْ أَنْ أَشْكُرَ نِعْمَتِكَ الَّتِيْ أَنْعَمْتَ عَلَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ',
    latin: "Rabbi awzi'-nii an asykura ni'matakallatii an'amta 'alayya wa an a'mala shaalihan tardhaahu",
    translation: 'Ya Tuhanku, berilah aku ilham untuk tetap mensyukuri nikmat-Mu yang telah Engkau anugerahkan kepadaku dan untuk mengerjakan amal shalih yang Engkau ridhai.',
    category: 'Utama'
  },
  {
    id: 243,
    title: 'Doa Agar Selamat dari Sifat Pemarah dan Keras Kepala',
    arabic: 'اَللّٰهُمَّ سَخِّرْ لِيْ قَلْبِيْ وَأَذْهِبْ عَنِّيْ كULLَ خُلُقٍ سَيِّئٍ',
    latin: "Allaahumma sakh-khir lii qalbii wa adzhib 'annii kulla khuluqin sayyi'",
    translation: 'Ya Allah, tundukkanlah hatiku untuk-Mu dan hilangkanlah dariku segala perangai yang buruk.',
    category: 'Utama'
  },
  {
    id: 244,
    title: 'Doa Memohon Kedamaian Jiwa dan Rasa Puas (Qana\'ah)',
    arabic: 'اَللّٰهُمَّ قَنِّعْنِيْ بِمَا رَزَقْتَنِيْ وَبَارِكْ لِيْ فِيْهِ وَأَخْلِفْ عَلَى كُلِّ غَائِبَةٍ لِيْ بِخَيْرٍ',
    latin: "Allaahumma qanni'nii bimaa razaqtanii wa baarik lii fiihi wakhlif 'alaa kulli ghaa'ibatin lii bikhair",
    translation: 'Ya Allah, jadikanlah aku merasa puas dengan rezeki yang Engkau berikan kepadaku, berkahilah aku di dalamnya, dan gantilah segala apa yang hilang dariku dengan kebaikan.',
    category: 'Utama'
  },
  {
    id: 245,
    title: 'Doa Ketika Menghadapi Pekerjaan / Proyek yang Sangat Sulit',
    arabic: 'رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
    latin: "Rabbanaa aatinaa min ladunka rahmatan wa hayyi' lanaa min amrinaa rasyadaa",
    translation: 'Ya Tuhan kami, berikanlah rahmat kepada kami dari sisi-Mu dan sempurnakanlah petunjuk yang lurus bagi kami dalam urusan kami.',
    category: 'Aktivitas'
  },
  {
    id: 246,
    title: 'Doa Saat Kehilangan Barang Berharga (Agar Diberi Ganti Lebih Baik)',
    arabic: 'اَللّٰهُمَّ أْجُرْنِيْ فِيْ مُصِيْبَتِيْ وَأخْلِفْ لِيْ خَيْرًا مِنْهَا',
    latin: "Allaahumma'-jurnii fii mushiibatii wa akhlif lii khayran minhaa",
    translation: 'Ya Allah, berilah aku pahala dalam musibahku ini dan berilah aku ganti yang lebih baik darinya.',
    category: 'Harian'
  },
  {
    id: 247,
    title: 'Doa Ketika Hendak Memotong Hewan Kurban / Aqiqah',
    arabic: 'بِسْمِ اللّٰهِ وَاللّٰهُ أَكْبَرُ، اَللّٰهُمَّ هٰذَا مِنْكَ وَإِلَيْكَ',
    latin: "Bismillaahi wallaahu Akbar, Allaahumma haadzaa minka wa ilayk",
    translation: 'Dengan nama Allah dan Allah Maha Besar. Ya Allah, kurban ini adalah dari-Mu dan untuk-Mu.',
    category: 'Ibadah'
  },
  {
    id: 248,
    title: 'Doa Memohon Diwafatkan Bersama Orang-orang Shalih (Abraar)',
    arabic: 'رَبَّنَا فَاغْفِرْ لَنَا ذُنُوْبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ',
    latin: "Rabbanaa faghfir lanaa dzunuubanaa wa kaffir 'annaa sayyi'aatinaa wa tawaffanaa ma'al-abraar",
    translation: 'Ya Tuhan kami, ampunilah dosa-dosa kami dan hapuskanlah kesalahan-kesalahan kami, dan wafatkanlah kami beserta orang-orang yang berbakti (shalih).',
    category: 'Utama'
  },
  {
    id: 249,
    title: 'Doa Mendengar Adzan Maghrib (Saat Transisi Siang ke Malam)',
    arabic: 'اَللّٰهُمَّ هٰذَا إِقْبَالُ لَيْلِكَ وَإِدْبَارُ نَهَارِكَ وَأَصْوَاتُ دُعَاتِكَ فَاغْفِرْ لِيْ',
    latin: "Allaahumma haadzaa iqbaalu laylika wa idbaaru nahaarika wa ashwaatu du'aatika faghfir lii",
    translation: 'Ya Allah, ini adalah menjelang malam-Mu, surutnya siang-Mu, dan suara para penyeru-Mu, maka ampunilah aku.',
    category: 'Ibadah'
  },
  {
    id: 250,
    title: 'Doa Saat Berbuka Puasa (Sesuai Sunnah Shahih)',
    arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوْقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللّٰهُ',
    latin: "Dzahabaz-zhama'u wabtallatil-'uruuqu wa tsabatal-ajru in syaa'allaah",
    translation: 'Telah hilang rasa haus, telah basah urat-urat, dan telah tetap pahala, insya Allah.',
    category: 'Ibadah'
  },
  {
    id: 251,
    title: 'Doa Ketika Melakukan Sujud Tilawah (Sajadah)',
    arabic: 'سَجَدَ وَجْهِيْ لِلَّذِيْ خَلَقَهُ وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ فَتَبَارَكَ اللّٰهُ أَحْسَنُ الْخَالِقِيْنَ',
    latin: "Sajada wajhii lilladzii khalaqahu wa syaqqa sam'ahu wa basharahu bihawlihi wa quwwatihi fatabaarakallaahu ahsanul-khaaliqiin",
    translation: 'Wajahku bersujud kepada Dzat yang menciptakannya, yang membelah pendengaran dan penglihatannya dengan daya dan kekuatan-Nya. Maha Suci Allah, sebaik-baik Pencipta.',
    category: 'Ibadah'
  },
  {
    id: 252,
    title: 'Doa Ketika Melakukan Sujud Sahwi (Lupa dalam Sholat)',
    arabic: 'سُبْحَانَ مَنْ لَا يَنَامُ وَلَا يَسْهُوْ',
    latin: "Subhaana man laa yanaamu wa laa yas-huu",
    translation: 'Maha Suci Dzat yang tidak pernah tidur dan tidak pernah lupa.',
    category: 'Ibadah'
  },
  {
    id: 253,
    title: 'Doa Ketika Mendapatkan Pujian dari Orang Lain (Agar Rendah Hati)',
    arabic: 'اَللّٰهُمَّ اجْعَلْنِيْ خَيْرًا مِمَّا يَظُنُّوْنَ، وَاغْفِرْ لِيْ مَا لَا يَعْلَمُوْنَ، وَلَا تُؤَاخِذْنِيْ بِمَا يَقُوْلُوْنَ',
    latin: "Allaahummaj-'alnii khairan mimmaa yazhunnuun, waghfir lii maa laa ya'lamuun, wa laa tu'aakhidznii bimaa yaquuluun",
    translation: 'Ya Allah, jadikanlah aku lebih baik dari apa yang mereka duga, ampunilah aku atas apa yang tidak mereka ketahui tentang diriku, dan janganlah Engkau hukum aku karena apa yang mereka katakan.',
    category: 'Utama'
  },
  {
    id: 254,
    title: 'Doa Membalas Kebaikan Orang yang Memberi Hadiah / Bantuan',
    arabic: 'جَزَاكَ اللّٰهُ خَيْرًا',
    latin: "Jazaakallaahu khairan",
    translation: 'Semoga Allah membalasmu dengan kebaikan yang banyak.',
    category: 'Harian'
  },
  {
    id: 255,
    title: 'Doa Ketika Melihat Seseorang Tersenyum atau Bahagia',
    arabic: 'أَضْحَكَ اللّٰهُ سِنَّكَ وَأَسْعَدَ قَلْبَكَ',
    latin: "Adh-hakallaahu sinnaka wa as'ada qalbaka",
    translation: 'Semoga Allah membuat gigimu selalu tersenyum (senang) dan membahagiakan hatimu.',
    category: 'Harian'
  },
  {
    id: 256,
    title: 'Doa Saat Memohon Kemudahan Urusan (Doa Ta\'sir)',
    arabic: 'رَبِّ يَسِّرْ وَلَا تُعَسِّرْ، رَبِّ تَمِّمْ بِالْخَيْرِ',
    latin: "Rabbi yassir wa laa tu'assir, rabbi tammim bil-khair",
    translation: 'Ya Tuhanku mudahkanlah dan jangan dipersulit, ya Tuhanku akhirilah segalanya dengan kebaikan.',
    category: 'Utama'
  },
  {
    id: 257,
    title: 'Doa Memohon Cahaya Terang dalam Diri (Doa Nur Lengkap)',
    arabic: 'اَللّٰهُمَّ اجْعَلْ فِيْ قَلْبِيْ نُوْرًا، وَفِيْ لِسَانِيْ نُوْرًا، وَفِيْ سَمْعِيْ نُوْرًا، وَفِيْ بَصَرِيْ نُوْرًا',
    latin: "Allaahummaj-'al fii qalbii nuuran, wa fii lisaanii nuuran, wa fii sam'ii nuuran, wa fii basharii nuuran",
    translation: 'Ya Allah, jadikanlah cahaya di dalam hatiku, cahaya pada lisanku, cahaya pada pendengaranku, dan cahaya pada penglihatanku.',
    category: 'Utama'
  },
  {
    id: 258,
    title: 'Doa Ketika Menghadapi Orang Jahil / Musuh dengan Bismillah',
    arabic: 'إِنَّه مِنْ سُلَيْمَانَ وَإِنَّهُ بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ',
    latin: "Innahu min sulaimaana wa innahu bismillaahirrahmaanir-rahiim",
    translation: 'Sesungguhnya surat itu dari Nabi Sulaiman dan sesungguhnya isinya: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang."',
    category: 'Aktivitas'
  },
  {
    id: 259,
    title: 'Doa Saat Mengalami Panas / Demam Tinggi',
    arabic: 'بِسْمِ اللّٰهِ الْكَبِيْرِ، أَعُوْذُ بِاللّٰهِ الْعَظِيْمِ مِنْ شَرِّ كُلِّ عِرْقٍ نَعَّارٍ وَمِنْ شَرِّ حَرِّ النَّارِ',
    latin: "Bismillaahil-kabiir, a'uudzu billaahil-'azhiimi min syarri kulli 'irqin na'aarin wa min syarri harrin-naar",
    translation: 'Dengan nama Allah Yang Maha Besar. Aku berlindung kepada Allah Yang Maha Agung dari keburukan setiap urat yang memancarkan darah dan dari keburukan panasnya api neraka.',
    category: 'Harian'
  },
  {
    id: 260,
    title: 'Doa Memohon Umur Panjang yang Berkah dan Penuh Ketaatan',
    arabic: 'اَللّٰهُمَّ طَوِّلْ عُمُوْرَنَا فِيْ طَاعَتِكَ وَطَاعَتِ رَسُوْلِكَ، وَحَسِّنْ أَعْمَالَنَا',
    latin: "Allaahumma thawwil 'umuuranaa fii thaa'atika wa thaa'ati rasuulika, wa hassin a'maalanaa",
    translation: 'Ya Allah, panjangkanlah umur kami dalam ketaatan kepada-Mu dan ketaatan kepada Rasul-Mu, serta baguskanlah amal perbuatan kami.',
    category: 'Utama'
  },
  {
    id: 261,
    title: 'Doa Menjenguk Orang Sakit Parah (Memohon Keputusan Terbaik)',
    arabic: 'اَللّٰهُمَّ أَحْيِنِيْ مَا كَانَتِ الْحَيَاةُ خَيْرًا لِيْ، وَتَوَفَّنِيْ إِذَا كَانَتِ الْوَفَاةُ خَيْرًا لِيْ',
    latin: "Allaahumma ahyinii maa kaanatil-hayaatu khairan lii, wa tawaffanii idzaa kaanatil-wafaatu khairan lii",
    translation: 'Ya Allah, hidupkanlah aku selama kehidupan itu baik bagiku, dan wafatkanlah aku jika kematian itu lebih baik bagiku.',
    category: 'Harian'
  },
  {
    id: 262,
    title: 'Doa Pembersih Hati dari Nafsu dan Kebiasaan Buruk',
    arabic: 'اَللّٰهُمَّ اغْفِرْ ذَنْبِيْ وَطَهِّرْ قَلْبِيْ وَحَصِّنْ فَرْجِيْ',
    latin: "Allaahummagh-fir dzanbii wa thahhir qalbii wa hash-shin farjii",
    translation: 'Ya Allah, ampunilah dosaku, bersihkanlah hatiku, dan jagalah kemaluanku (dari perbuatan keji).',
    category: 'Utama'
  },
  {
    id: 263,
    title: 'Doa Perlindungan dari Bencana Alam (Gempa Bumi, Tsunami, dll)',
    arabic: 'اَللّٰهُمَّ لَا تَقْتُلْنَا بِغَضَبِكَ وَلَا تُهْلِكْنَا بِعَذَابِكَ وَعَافِنَا قَبْلَ ذٰلِكَ',
    latin: "Allaahumma laa taqtulnaa bighadhabika wa laa tuhliknaa bi'adzaabika wa 'aafinaa qabla dzaalik",
    translation: 'Ya Allah, janganlah Engkau bunuh kami dengan kemurkaan-Mu, janganlah Engkau binasakan kami dengan azab-Mu, dan berilah kami keselamatan sebelum itu datang.',
    category: 'Alam'
  },
  {
    id: 264,
    title: 'Doa Menyambut Tamu dengan Hangat dan Penuh Berkah',
    arabic: 'مَرْحَبًا بِكُمْ وَأَهْلًا وَسَهْلًا، بَارَكَ اللّٰهُ فِيْ مَجِيْئِكُمْ',
    latin: "Marhaban bikum wa ahlan wa sahlan, baarakallaahu fii majii'ikum",
    translation: 'Selamat datang kepada kalian, semoga Allah melimpahkan keberkahan atas kedatangan kalian.',
    category: 'Harian'
  },
  {
    id: 265,
    title: 'Doa Perlindungan dari Pengkhianatan Teman / Rekan Kerja',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْخِيَانَةِ فَإِنَّهَا بِئْسَتِ الْبِطَانَةُ',
    latin: "Allaahumma innii a'uudzu bika minal-khiyaanati fa-innahaa bi'satil-bithaanah",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari pengkhianatan, karena pengkhianatan itu adalah seburuk-buruknya sifat batin/teman dekat.',
    category: 'Utama'
  },
  {
    id: 266,
    title: 'Doa Rasulullah Memohon Hidayah untuk Orang yang Membenci Kita',
    arabic: 'اَللّٰهُمَّ اهْدِ قَوْمِيْ فَإِنَّهُمْ لَا يَعْلَمُوْنَ',
    latin: "Allaahummahdii qawmii fa-innahum laa ya'lamuun",
    translation: 'Ya Allah, berilah petunjuk kepada kaumku, karena sesungguhnya mereka tidak mengetahui (kebenaran).',
    category: 'Utama'
  },
  {
    id: 267,
    title: 'Doa Mohon Terhindar dari Sifat Ragu / Was-was dalam Keyakinan',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الشَّكِّ وَالشِّرْكِ وَالشِّقَاقِ وَالنِّفَاقِ',
    latin: "Allaahumma innii a'uudzu bika minasy-syakki wasy-syirki wasy-syiqaaqi wan-nifaaq",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari keraguan, kesyirikan, perpecahan, dan kemunafikan.',
    category: 'Utama'
  },
  {
    id: 268,
    title: 'Doa Ketika Dihadapkan pada Pilihan yang Sulit (Doa Istikharah Ringkas)',
    arabic: 'اَللّٰهُمَّ خِرْ لِيْ وَاخْتَرْ لِيْ وَيَسِّرْهُ لِيْ ثُمَّ بَارِكْ لِيْ فِيْهِ',
    latin: "Allaahumma khir lii wakhtar lii wa yassirhu lii tsumma baarik lii fiih",
    translation: 'Ya Allah, pilihkanlah untukku dan tentukanlah yang terbaik bagiku, mudahkanlah ia bagiku kemudian berkahilah aku di dalamnya.',
    category: 'Harian'
  },
  {
    id: 269,
    title: 'Doa Ketika Hendak Memulai Pekerjaan atau Proyek Baru',
    arabic: 'اَللّٰهُمَّ بِكَ أَسْتَعِيْنُ وَعَلَيْكَ أَتَوَكَّلُ، اَللّٰهُمَّ ذَلِّلْ لِيْ صُعُوْبَةَ أَمْرِيْ',
    latin: "Allaahumma bika asta'iinu wa 'alaika atawakkalu, Allaahumma dzallil lii shu'oobata amrii",
    translation: 'Ya Allah, hanya kepada-Mu aku memohon pertolongan dan hanya kepada-Mu aku bertawakkal. Ya Allah, mudahkanlah bagiku segala kesulitan urusanku.',
    category: 'Aktivitas'
  },
  {
    id: 270,
    title: 'Doa Agar Diberi Sifat Pemaaf dan Kelapangan Hati',
    arabic: 'اَللّٰهُمَّ اسْتُرْ عَوْرَاتِنَا وَآمِنْ رَوْعَاتِنَا وَاعْفُ عَنَّا بِكَرَمِكَ',
    latin: "Allaahummastur 'awraatinaa wa aamin raw'aatinaa wa'fu 'annaa bikaramik",
    translation: 'Ya Allah, tutuplah celah/aib kami, tenteramkanlah kekhawatiran kami, dan maafkanlah kami dengan kemurahan-Mu.',
    category: 'Utama'
  },
  {
    id: 271,
    title: 'Doa Agar Diberikan Ketakwaan yang Selalu Terjaga',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    latin: "Allaahumma innii as'alukal-hudaa wat-tuqaa wal-'afaafa wal-ghinaa",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu petunjuk, ketakwaan, sifat iffah (terjaga dari yang haram), dan kecukupan (kekayaan hati).',
    category: 'Utama'
  },
  {
    id: 272,
    title: 'Doa Memohon Dijauhkan dari Sifat Dengki dan Penyakit Ain',
    arabic: 'اَللّٰهُمَّ بَارِكْ عَلَيْهِ وَلَا تَضُرَّهُ، اَللّٰهُمَّ أَذْهِبْ عَنْهُ حَرَّ الْعَيْنِ وَبَرْدَهَا',
    latin: "Allaahumma baarik 'alaihi wa laa tadhurrahu, Allaahumma adzhib 'anhu harral-'ayni wa bardahaa",
    translation: 'Ya Allah, berkahilah dia dan janganlah Engkau mendatangkan mudharat kepadanya. Ya Allah, hilangkanlah pengaruh buruk pandangan mata jahat (ain) darinya.',
    category: 'Utama'
  },
  {
    id: 273,
    title: 'Doa Ketika Khawatir Menyebabkan Kerusakan Hati Orang Lain',
    arabic: 'اَللّٰهُمَّ لَا تَجْعَلْنِيْ فِتْنَةً لِلَّذِيْنَ آمَنُوْا وَاغْفِرْ لِيْ رَبَّنَا',
    latin: "Allaahumma laa taj-'alnii fitnatal-lilladziina aamanuu waghfir lii rabbanaa",
    translation: 'Ya Allah, janganlah Engkau jadikan aku sebagai ujian/fitnah bagi orang-orang yang beriman, dan ampunilah aku wahai Tuhan kami.',
    category: 'Utama'
  },
  {
    id: 274,
    title: 'Doa Agar Diberi Keberanian Mengungkapkan Kebenaran',
    arabic: 'اَللّٰهُمَّ اجْعَلْ لِسَانِيْ صَادِقًا نَاطِقًا بِالْحَقِّ فِيْ كُلِّ مَوْطِنٍ',
    latin: "Allaahummaj-'al lisaanii shaadiqan naathiqan bil-haqqi fii kulli mawthin",
    translation: 'Ya Allah, jadikanlah lisanku jujur dan mampu menyuarakan kebenaran di setiap tempat/keadaan.',
    category: 'Utama'
  },
  {
    id: 275,
    title: 'Doa Saat Terjadi Perselisihan Keluarga (Mohon Kedamaian)',
    arabic: 'اَللّٰهُمَّ أَلِّفْ بَيْنَ قُلُوْبِنَا، وَأَصْلِحْ ذَاتَ بَيْنِنَا، وَاهْدِنَا سُبُلَ السَّلَامِ',
    latin: "Allaahumma allif baina quluubinaa, wa ashlih dzaata baininaa, wahdinaa subulas-salaam",
    translation: 'Ya Allah, satukanlah di antara hati kami, perbaikilah hubungan di antara kami, dan tunjukkanlah kami jalan-jalan keselamatan.',
    category: 'Utama'
  },
  {
    id: 276,
    title: 'Doa Memohon Rahmat & Kasih Sayang yang Luas (Doa Nabi Musa)',
    arabic: 'رَبِّ إِنِّيْ لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيْرٌ',
    latin: "Rabbi innii limaa anzalta ilayya min khairin faqiir",
    translation: 'Ya Tuhanku, sesungguhnya aku sangat memerlukan sesuatu kebaikan (rezeki) yang Engkau turunkan kepadaku.',
    category: 'Utama'
  },
  {
    id: 277,
    title: 'Doa Ketika Menolak Godaan Kemaksiatan (Doa Nabi Yusuf)',
    arabic: 'مَعَاذَ اللّٰهِ إِنَّهُ رَبِّيْ أَحْسَنَ مَثْوَايَ إِنَّهُ لَا يُفْلِحُ الظَّالِمُوْنَ',
    latin: "Ma'aadza-llaahi innahu rabbii ahsana matswaaya innahu laa yuflihuz-zhaalimoon",
    translation: 'Aku berlindung kepada Allah, sungguh tuanku telah memperlakukan aku dengan baik. Sesungguhnya orang-orang yang dzalim itu tidak akan beruntung.',
    category: 'Utama'
  },
  {
    id: 278,
    title: 'Doa Nabi Nuh Memohon Ampunan untuk Kedua Orang Tua',
    arabic: 'رَبِّ اغْفِرْ لِيْ وَلِوَALِِدَيَّ وَلِمَنْ دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِيْنَ وَالْمُؤْمِنَاتِ',
    latin: "Rabbigh-firlii wa liwaalidayya wa liman dakhala baitiya mu'minan wa lil-mu'miniina wal-mu'minaat",
    translation: 'Ya Tuhanku, ampunilah aku, ibu bapakku, dan siapa saja yang memasuki rumahku dengan beriman, serta semua orang yang beriman laki-laki dan perempuan.',
    category: 'Utama'
  },
  {
    id: 279,
    title: 'Doa Memohon Kemenangan & Keteguhan (Doa Orang Rabbani)',
    arabic: 'رَبَّنَا اغْفِرْ لَنَا ذُنُوْبَنَا وَإِسْرَافَنَا فِيْ أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِيْنَ',
    latin: "Rabbanagh-fir lanaa dzunuubanaa wa israafanaa fii amrinaa wa tsabbit aqdaamanaa wansurnaa 'alal-qawmil-kaafiriin",
    translation: 'Ya Tuhan kami, ampunilah dosa-dosa kami dan tindakan-tindakan kami yang berlebih-lebihan dalam urusan kami dan kokohkanlah pendirian kami, serta tolonglah kami terhadap orang-orang kafir.',
    category: 'Utama'
  },
  {
    id: 280,
    title: 'Doa Malaikat Pemikul Arsy untuk Orang-orang yang Bertaubat',
    arabic: 'رَبَّنَا وَسِعْتَ كُلِّ شَيْءٍ رَحْمَةً وَعِلْمًا فَاغْفِرْ لِلَّذِيْنَ تَابُوْا وَاتَّبَعُوْا سَبِيْلَكَ وَقِهِمْ عَذَابَ الْجَحِيْمِ',
    latin: "Rabbanaa wasi'ta kulla syai'in rahmatan wa 'ilman faghfir lilladziina taaboo wattaba'oo sabiilaka waqihim 'adzaabal-jahiim",
    translation: 'Ya Tuhan kami, rahmat dan ilmu-Mu meliputi segala sesuatu, maka berilah ampunan kepada orang-orang yang bertaubat dan mengikuti jalan-Mu, dan peliharalah mereka dari siksa neraka yang menyala-nyala.',
    category: 'Utama'
  },
  {
    id: 281,
    title: 'Doa Berlindung dari Bisikan dan Kehadiran Setan (QS. Al-Mu\'minun)',
    arabic: 'رَبِّ أَعُوْذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِيْنِ ۝ وَأَعُوْذُ بِكَ رَبِّ أَنْ يَحْضُرُوْنِ',
    latin: "Rabbi a'uudzu bika min hamazaatisy-syayaathiini wa a'uudzu bika rabbi ay-yahdhuroon",
    translation: 'Ya Tuhanku, aku berlindung kepada-Mu dari bisikan-bisikan setan, dan aku berlindung pula kepada-Mu ya Tuhanku, agar mereka tidak datang kepadaku.',
    category: 'Utama'
  },
  {
    id: 282,
    title: 'Doa Memohon Ditunjukkan Kebenaran di Tengah Perselisihan (Doa Iftitah Malam)',
    arabic: 'اَللّٰهُمَّ رَبَّ جِبْرَائِيْلَ وَمِيْكَائِيْلَ وَإِسْرَافِيْلَ، اِهْدِنِيْ لِمَا اخْتُلِفَ فِيْهِ مِنَ الْحَقِّ بِإِذْنِكَ، إِنَّكَ تَهْدِيْ مَنْ تَشَاءُ إِلَى صِرَاطٍ مُسْتَقِيْمٍ',
    latin: "Allaahumma rabba jibraa'iila wa miikaa'iila wa israafiil... Ihdinii limakh-tulifa fiihi minal-haqqi bi-idznika, innaka tahdii man tasyaau ilaa shiraathim-mustaqiim",
    translation: 'Ya Allah, Tuhan Jibril, Mikail, dan Israfil. Tunjukkanlah aku kepada kebenaran di tengah perselisihan dengan izin-Mu. Sesungguhnya Engkau menunjuki siapa yang Engkau kehendaki ke jalan yang lurus.',
    category: 'Ibadah'
  },
  {
    id: 283,
    title: 'Doa Agar Diberi Ingatan Kuat & Keberkahan dalam Menuntut Ilmu',
    arabic: 'اَللّٰهُمَّ ارْزُقْنِيْ فَهْمَ النَّبِيِّيْنَ وَحِفْظَ الْمُرْسَلِيْنَ وَإِلْهَامَ الْمَلَائِكَةِ الْمُقَرَّبِيْنَ',
    latin: "Allaahummar-zuqnii fahman-nabiyyiina wa hifzhal-mursaliina wa ilhaamal-malaa'ikatil-muqarrabiin",
    translation: 'Ya Allah, anugerahilah aku pemahaman para nabi, ingatan para rasul, dan ilham para malaikat yang dekat dengan-Mu.',
    category: 'Utama'
  },
  {
    id: 284,
    title: 'Doa Agar Dilindungi dari Sifat Hutang yang Menjerat Jiwa',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
    latin: "Allaahumma innii a'uudzu bika min ghalabatid-dayni wa qahrir-rijaal",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari jeratan hutang yang menumpuk dan kesewenang-wenangan manusia.',
    category: 'Utama'
  },
  {
    id: 285,
    title: 'Doa Mengatasi Susah Tidur / Overthinking di Malam Hari',
    arabic: 'اَللّٰهُمَّ غَارَتِ النُّجُوْمُ وَهَدَأَتِ الْعُيُوْنُ وَأَنْتَ حَيٌّ قَيُّوْمٌ، لَا تَأْخُذُكَ سِنَةٌ وَلَا نَوْمٌ، يَا حَيُّ يَا قَيُّوْمُ أَهْدِئْ لَيْلِيْ وَأَنِمْ عَيْنِيْ',
    latin: "Allaahumma ghaaratin-nujoomu wa hada'atil-'uyoonu wa anta hayyun qayyoom, laa ta'khudzuka sinatun wa laa nawm, yaa hayyu yaa qayyoomu ahdi' laylii wa anim 'aynii",
    translation: 'Ya Allah, bintang-bintang telah tenggelam, mata-mata telah tenang/pejam, sedangkan Engkau Maha Hidup lagi Maha Berdiri Sendiri, tidak mengantuk dan tidak pula tidur. Wahai Dzat Yang Maha Hidup lagi Maha Berdiri Sendiri, tenangkanlah malamku dan tidurkanlah mataku.',
    category: 'Harian'
  },
  {
    id: 286,
    title: 'Doa Ketika Merasa Was-was Saat Berwudhu (Setan Walhan)',
    arabic: 'أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الْوَلْهَانِ وَأَسْأَلُكَ الْيَقِيْنَ فِي الْعَمَلِ',
    latin: "A'uudzu billaahi minasy-syaythaanil-walhaani wa as'alukal-yaqiina fil-'amal",
    translation: 'Aku berlindung kepada Allah dari setan Walhan (penggoda wudhu) dan aku memohon keyakinan dalam beramal.',
    category: 'Ibadah'
  },
  {
    id: 287,
    title: 'Doa Ketika Memotong Kuku (Menjaga Kebersihan Fitrah)',
    arabic: 'بِسْمِ اللّٰهِ وَعَلَى مِلَّةِ رَسُوْلِ اللّٰهِ صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ',
    latin: "Bismillaahi wa 'alaa millati rasoolillaahi shallallaahu 'alaihi wa sallam",
    translation: 'Dengan nama Allah dan di atas jalan/sunnah Rasulullah shallallahu alaihi wa sallam.',
    category: 'Harian'
  },
  {
    id: 288,
    title: 'Doa Ketika Mencukur Rambut / Potong Rambut',
    arabic: 'اَللّٰهُمَّ اجْعَلْ لِيْ بِكُلِّ شَعْرَةٍ نُوْرًا يَوْمَ الْقِيَامَةِ وَامْحُ عَنِّيْ بِهَا سَيِّئَةً',
    latin: "Allaahummaj-'al lii bikulli sya'ratin nuoran yawmal-qiyaamah wamhu 'annii bihaa sayyi'ah",
    translation: 'Ya Allah, jadikanlah bagiku cahaya pada setiap helai rambutku di hari kiamat kelak, dan hapuskanlah keburukanku dengannya.',
    category: 'Harian'
  },
  {
    id: 289,
    title: 'Doa Memohon Keberkahan Waktu Agar Bermanfaat',
    arabic: 'اَللّٰهُمَّ بَارِكْ لَنَا فِيْ أَوْقَاتِنَا وَاجْعَلْ حَيَاتَنَا زِيَادَةً فِيْ كُلِّ خَيْرٍ',
    latin: "Allaahumma baarik lanaa fii awqaatinaa waj-'al hayaatanaa ziyaadatan fii kulli khair",
    translation: 'Ya Allah, berkahilah kami dalam waktu-waktu kami, dan jadikanlah hidup kami sebagai sarana untuk menambah segala kebaikan.',
    category: 'Utama'
  },
  {
    id: 290,
    title: 'Doa Agar Dijauhkan dari Rasa Dengki atas Rezeki Orang Lain',
    arabic: 'اَللّٰهُمَّ رَضِّنِيْ بِمَا قَسَمْتَ لِيْ وَبَارِكْ لِيْ فِيْمَا رَزَقْتَنِيْ',
    latin: "Allaahumma radhdhinii bimaa qasamta lii wa baarik lii fiimaa razaqtanii",
    translation: 'Ya Allah, jadikanlah aku ridha dengan apa yang Engkau bagikan untukku, dan berkahilah aku pada apa yang Engkau rezekikan kepadaku.',
    category: 'Utama'
  },
  {
    id: 291,
    title: 'Doa Agar Terhindar dari Sifat Takjub Dunia (Kunci Qana\'ah)',
    arabic: 'اَللّٰهُمَّ لَا عَيْشَ إِلَّا عَيْشُ الْآخِرَةِ فَاغْفِرْ لِلْأَنْصَارِ وَالْمُهَاجِرَةِ',
    latin: "Allaahumma laa 'aysya illaa 'aysyul-aakhirati faghfir lil-anshaari wal-muhaajirah",
    translation: 'Ya Allah, tidak ada kehidupan yang hakiki melainkan kehidupan akhirat, maka ampunilah kaum Anshar dan Muhajirin.',
    category: 'Utama'
  },
  {
    id: 292,
    title: 'Doa Melindungi Anak dari Zina & Kerusakan Akhlak (Doa Rasulullah)',
    arabic: 'اَللّٰهُمَّ اغْفِرْ ذَنْبَهُ، وَطَهِّرْ قَلْبَهُ، وَحَصِّنْ فَرْجَهُ',
    latin: "Allaahummagh-fir dzanbahu, wa thahhir qalbahu, wa hash-shin farjahu",
    translation: 'Ya Allah, ampunilah dosanya, bersihkanlah hatinya, dan jagalah kemaluannya (aurat/kehormatannya).',
    category: 'Utama'
  },
  {
    id: 293,
    title: 'Doa Memohon Jodoh Terbaik (Bagi Laki-laki & Perempuan)',
    arabic: 'رَبِّ هَبْ لِيْ مِنْ لَدُنْكَ زَوْجًا صَالِحًا / زَوْجَةً صَالِحَةً تَقَرُّ بِهِ عَيْنِيْ',
    latin: "Rabbi hab lii milladunka zaujan shaalihan / zaujatan shaalihatan taqarru bihi 'aynii",
    translation: 'Ya Tuhanku, anugerahkanlah kepadaku dari sisi-Mu pasangan hidup yang shalih/shalihah yang menyejukkan pandangan mataku.',
    category: 'Utama'
  },
  {
    id: 294,
    title: 'Doa Ketika Mengalami Nyeri / Sakit Gigi (Doa Meredakan Sakit)',
    arabic: 'اَللّٰهُمَّ أَذْهِبْ عَنِّيْ سُوءَ مَا أَجِدُ وَشَرَّهُ بِرَحْمَتِكَ يَا أَرْمَحَ الرَّاحِمِيْنَ',
    latin: "Allaahumma adzhib 'annii soo'a maa ajidu wa syarrahu birahmatika yaa arhamar-raahimiin",
    translation: 'Ya Allah, hilangkanlah dariku keburukan dan rasa sakit yang aku rasakan dengan rahmat-Mu, wahai Dzat Yang Maha Penyayang.',
    category: 'Harian'
  },
  {
    id: 295,
    title: 'Doa Memohon Diberikan Anak Keturunan yang Pintar & Sholeh',
    arabic: 'رَبِّ هَبْ لِيْ مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيْعُ الدُّعَاءِ',
    latin: "Rabbi hab lii milladunka dzurriyyatan thayyibatan innaka samii'ud-du'aa'",
    translation: 'Ya Tuhanku, berilah aku dari sisi-Mu seorang anak yang baik. Sesungguhnya Engkau Maha Pendengar doa.',
    category: 'Utama'
  },
  {
    id: 296,
    title: 'Doa Ketika Menghadapi Orang yang Menghina / Meremehkan Kita',
    arabic: 'حَسْبِيَ اللّٰهُ لِدِيْنِيْ، حَسْبِيَ اللّٰهُ لِدُنْيَايَ، حَسْبِيَ اللّٰهُ لِمَا أَهَمَّنِيْ',
    latin: "Hasbiyallaahu li-diinii, hasbiyallaahu li-dunyaaya, hasbiyallaahu limaa ahammaniy",
    translation: 'Cukuplah Allah bagiku untuk agamaku, cukuplah Allah bagiku untuk duniaku, cukuplah Allah bagiku untuk urusan yang menyusahkanku.',
    category: 'Harian'
  },
  {
    id: 297,
    title: 'Doa Memohon Husnul Khotimah di Hari Jumat yang Berkah',
    arabic: 'اَللّٰهُمَّ اجْعَلْ وَفَاتِيْ فِيْ يَوْمِ الْجُمُعَةِ أَوْ لَيْلَتِهِ مَقْبُوْلًا عِنْدَكَ',
    latin: "Allaahummaj-'al wafaatii fii yawmil-jumu'ati aw laylatihi maqboolan 'indaka",
    translation: 'Ya Allah, jadikanlah wafatku di hari Jumat atau malam Jumat dalam keadaan diterima di sisi-Mu.',
    category: 'Utama'
  },
  {
    id: 298,
    title: 'Doa Mohon Terhindar dari Sifat Malas Beribadah (Dzikir Penguat Iman)',
    arabic: 'اَللّٰهُمَّ لَا تَكِلْنِيْ إِلَى نَفْسِيْ طَرْفَةَ عَيْنٍ وَأَصْلِحْ لِيْ شَأْنِيْ كُلَّهُ',
    latin: "Allaahumma laa takilnii ilaa nafsii tharfata 'aynin wa ashlih lii sya'nii kullahu",
    translation: 'Ya Allah, janganlah Engkau serahkan urusanku kepada diriku sendiri walau sekejap mata pun, dan perbaikilah seluruh urusanku.',
    category: 'Utama'
  },
  {
    id: 299,
    title: 'Doa Saat Hendak Mengambil Keputusan yang Sangat Berat (Istikharah Jiwa)',
    arabic: 'اَللّٰهُمَّ اهْدِ قَلْبِيْ وَثَبِّتْ لِسَانِيْ وَاخْتَرْ لِيْ مَا فِيْهِ خَيْرٌ لِيْ',
    latin: "Allaahummahdii qalbii wa tsabbit lisaanii wakhtar lii maa fiihi khayrun lii",
    translation: 'Ya Allah, tunjukilah hatiku, teguhkanlah lidahku, dan pilihlah untukku apa yang di dalamnya terdapat kebaikan bagiku.',
    category: 'Harian'
  },
  {
    id: 300,
    title: 'Doa Memohon Ditunjukkan Jalan yang Lurus (QS. Al-Fatihah)',
    arabic: 'اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَ',
    latin: "Ihdinas-shiraathal-mustaqiim",
    translation: 'Tunjukkanlah kami jalan yang lurus.',
    category: 'Ibadah'
  },
  {
    id: 301,
    title: 'Doa Ketika Menjenguk Orang Sakit Mata',
    arabic: 'اَللّٰهُمَّ مَتِّعْهُ بِبَصَرِهِ وَاجْعَلْهُ الْوَارِثَ مِنْهُ',
    latin: "Allaahumma matti'hu bibasharihi waj-'alhul-waaritsa minhu",
    translation: 'Ya Allah, berilah dia kemanfaatan pada penglihatannya dan jadikanlah penglihatan itu tetap sehat sampai akhir hayatnya.',
    category: 'Harian'
  },
  {
    id: 302,
    title: 'Doa Ketika Khawatir Terkena Sifat Riya\' saat Bersedekah',
    arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيْعُ الْعَلِيْمُ',
    latin: "Rabbanaa taqabbal minnaa innaka antas-samii'ul-'aliim",
    translation: 'Ya Tuhan kami, terimalah (amal) dari kami. Sesungguhnya Engkaulah Yang Maha Mendengar lagi Maha Mengetahui.',
    category: 'Utama'
  },
  {
    id: 303,
    title: 'Doa Saat Mengalami Keguguran Kandungan (Doa Penghibur Orang Tua)',
    arabic: 'اَللّٰهُمَّ اجْعَلْهُ لَنَا سَلَفًا وَفَرَطًا وَأَجْرًا',
    latin: "Allaahummaj-'alhu lanaa salafan wa farathan wa ajraa",
    translation: 'Ya Allah, jadikanlah anak ini bagi kami sebagai simpanan (di akhirat), pendahulu, dan pahala.',
    category: 'Harian'
  },
  {
    id: 304,
    title: 'Doa Memohon Kemuliaan Bagi Kedua Orang Tua (QS. Al-Isra\': 24)',
    arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرًا',
    latin: "Rabbir-hamhumaa kamaa rabbayaanii shaghiiraa",
    translation: 'Wahai Tuhanku, kasihilah mereka keduanya, sebagaimana mereka berdua telah mendidik aku waktu kecil.',
    category: 'Utama'
  },
  {
    id: 305,
    title: 'Doa Ketika Memasuki Tempat Tinggal Baru / Rumah Baru (QS. Al-Mu\'minun)',
    arabic: 'رَبِّ أَنْزِلْنِيْ مُنْزَلًا مُبَارَكًا وَأَنْتَ خَيْرُ الْمُنْزِلِيْنَ',
    latin: "Rabbi anzilnii munzalan mubaarakan wa anta khairul-munziliin",
    translation: 'Ya Tuhanku, tempatkanlah aku pada tempat yang diberkahi, dan Engkau adalah sebaik-baik yang memberi tempat.',
    category: 'Harian'
  },
  {
    id: 306,
    title: 'Doa Nabi Ayub Memohon Kesembuhan dari Penyakit Kronis / Berat',
    arabic: 'رَبِّ أَنِّيْ مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِيْنَ',
    latin: "Rabbi annii massaniyadh-dhurru wa anta arhamur-raahimiin",
    translation: 'Ya Tuhanku, sesungguhnya aku telah ditimpa penyakit/kemudharatan dan Engkau adalah Tuhan Yang Maha Penyayang di antara semua penyayang.',
    category: 'Utama'
  },
  {
    id: 307,
    title: 'Doa Nabi Isa Memohon Keadilan dan Ampunan untuk Umat',
    arabic: 'إِنْ تُعَذِّبْهُمْ فَإِنَّهُمْ عِبَادُكَ وَإِنْ تَغْفِرْ لَهُمْ فَإِنَّكَ أَنْتَ الْعَزِيْزُ الْحَكِيْمُ',
    latin: "In tu'adzdzibhum fa-innahum 'ibaaduka wa in taghfir lahum fa-innaka antal-'aziizul-hakiim",
    translation: 'Jika Engkau menyiksa mereka, maka sesungguhnya mereka adalah hamba-hamba-Mu, dan jika Engkau mengampuni mereka, maka sesungguhnya Engkaulah Yang Maha Perkasa lagi Maha Bijaksana.',
    category: 'Utama'
  },
  {
    id: 308,
    title: 'Doa Nabi Khidir Memohon Keselamatan dan Kelapangan Rezeki',
    arabic: 'بِسْمِ اللّٰهِ مَاشَاءَ اللّٰهُ لَا يَسُوْقُ الْخَيْرَ إِلَّا اللّٰهُ، مَاشَاءَ اللّٰهُ لَا يَصْرِفُ السُّوْءَ إِلَّا اللّٰهُ',
    latin: "Bismillaahi maasyaa-allaahu laa yasooqul-khayra illallaah, maasyaa-allaahu laa yasrifus-soora illallaah",
    translation: 'Dengan nama Allah, atas kehendak Allah, tidak ada yang mendatangkan kebaikan kecuali Allah. Atas kehendak Allah, tidak ada yang menjauhkan keburukan kecuali Allah.',
    category: 'Utama'
  },
  {
    id: 309,
    title: 'Doa Memohon Dikaruniai Hikmah dan Digabungkan dengan Orang Shalih',
    arabic: 'رَبِّ هَبْ لِيْ حُكْمًا وَأَلْحِقْنِيْ بِالصَّالِحِيْنَ',
    latin: "Rabbi hab lii hukman wa alhiqnii bish-shaalihiin",
    translation: 'Ya Tuhanku, berikanlah kepadaku hikmah (ilmu/kearifan) dan gabungkanlah aku dengan orang-orang yang shalih.',
    category: 'Utama'
  },
  {
    id: 310,
    title: 'Doa Memohon Lisan yang Jujur dan Terpercaya di Generasi Mendatang',
    arabic: 'وَاجْعَلْ لِيْ لِسَانَ صِدْقٍ فِيْ الْآخِرِيْنَ',
    latin: "Waj-'al lii lisaana shidqin fil-aakhiriin",
    translation: 'Dan jadikanlah aku buah tutur yang baik (lisan yang jujur) bagi orang-orang (generasi) yang datang kemudian.',
    category: 'Utama'
  },
  {
    id: 311,
    title: 'Doa Memohon Dijadikan Pewaris Surga Na\'im',
    arabic: 'وَاجْعَلْنِيْ مِنْ وَرَثَةِ جَنَّةِ النَّعِيْمِ',
    latin: "Waj-'alnii min waratsati jannatin-na'iim",
    translation: 'Dan jadikanlah aku termasuk orang-orang yang mewarisi surga yang penuh kenikmatan.',
    category: 'Utama'
  },
  {
    id: 312,
    title: 'Doa Memohon Agar Tidak Dihinakan pada Hari Kebangkitan',
    arabic: 'وَلَا تُخْزِنِيْ يَوْمَ يُبْعَثُوْنَ',
    latin: "Wa laa tukhzinii yawma yub'atsoon",
    translation: 'Dan janganlah Engkau hinakan aku pada hari mereka dibangkitkan kembali (hari kiamat).',
    category: 'Utama'
  },
  {
    id: 313,
    title: 'Doa Saat Berada di Tengah Kerumunan Banyak Orang (Dzikir Pengaman)',
    arabic: 'اَللّٰهُمَّ احْفَظْنِيْ بِعَيْنِكَ الَّتِيْ لَا تَنَامُ، وَاكْنِفْنِيْ بِرُكْنِكَ الَّذِيْ لَا يُرَامُ',
    latin: "Allaahummah-fazhnii bi-'aynikallatii laa tanaam, waknifnii bi-ruknikalladzii laa yuraam",
    translation: 'Ya Allah, jagalah aku dengan mata-Mu yang tidak pernah tidur, dan lindungilah aku dengan pilar perlindungan-Mu yang tidak akan runtuh.',
    category: 'Aktivitas'
  },
  {
    id: 314,
    title: 'Doa Mohon Keselamatan dari Sifat Pelit dan Kikir (QS. Al-Hasyr)',
    arabic: 'رَبَّنَا وَقِنَا شُحَّ أَنْفُسِنَا وَاجْعَلْنَا مِنَ الْمُفْلِحِيْنَ',
    latin: "Rabbanaa wa qinaa syuhha anfusinaa waj-'alnaa minal-muflihiin",
    translation: 'Ya Tuhan kami, peliharalah kami dari kekikiran diri kami, dan jadikanlah kami termasuk orang-orang yang beruntung.',
    category: 'Utama'
  },
  {
    id: 315,
    title: 'Doa Ketika Terkena Penyakit Kulit, Alergi, atau Sakit Fisik',
    arabic: 'اَللّٰهُمَّ عَافِنِيْ فِيْ بَدَنِيْ، اَللّٰهُمَّ عَافِنِيْ فِيْ سَمْعِيْ، اَللّٰهُمَّ عَافِنِيْ فِيْ بَصَرِيْ',
    latin: "Allaahumma 'aafinii fii badanii, Allaahumma 'aafinii fii sam'ii, Allaahumma 'aafinii fii basharii",
    translation: 'Ya Allah, sehatkanlah badanku, Ya Allah, sehatkanlah pendengaranku, Ya Allah, sehatkanlah penglihatanku.',
    category: 'Harian'
  },
  {
    id: 316,
    title: 'Doa Ketika Hendak Menjual Barang / Rumah Agar Cepat Laku & Berkah',
    arabic: 'اَللّٰهُمَّ يَسِّرْ بَيْعَهُ وَبَارِكْ لَنَا فِيْ ثَمَنِهِ وَاجْعَلْهُ خَيْرًا لَنَا',
    latin: "Allaahumma yassir bay'ahu wa baarik lanaa fii tsamanihi waj-'alhu khairan lanaa",
    translation: 'Ya Allah, mudahkanlah penjualannya, berkahilah kami pada uang hasilnya, dan jadikanlah transaksi ini mendatangkan kebaikan bagi kami.',
    category: 'Aktivitas'
  },
  {
    id: 317,
    title: 'Doa Ketika Hendak Mandi Sunnah Jumat',
    arabic: 'نَوَيْتُ الْغُسْلَ لِسُنَّةِ الْجُمُعَةِ لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla lisunnatil-jumu'ati lillaahi ta'aalaa",
    translation: 'Aku niat mandi sunnah Jumat karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 318,
    title: 'Doa Ketika Menghadapi Orang yang Suka Menyebarkan Fitnah / Gosip',
    arabic: 'اَللّٰهُمَّ اكْفِنِيْ شَرَّ لِسَانِهِ وَاكْتُمْ عَوْرَاتِيْ عَنْهُ',
    latin: "Allaahummak-finii syarra lisaanihi waktum 'awraatii 'anhu",
    translation: 'Ya Allah, cukupkanlah aku dari keburukan lisannya dan tutuplah aib-aibku darinya.',
    category: 'Harian'
  },
  {
    id: 319,
    title: 'Doa Agar Dibimbing Membelanjakan Harta di Jalan yang Benar (QS. Al-Furqan)',
    arabic: 'رَبَّنَا اجْعَلْنَا مِنَ الَّذِيْنَ إِذَا أَنْفَقُوْا لَمْ يُسْرِفُوْا وَلَمْ يَقْتُرُوْا وَكَانَ بَيْنَ ذٰلِكَ قَوَامًا',
    latin: "Rappanaj-'alnaa minal-ladziina idzaa anfaqoo lam yusrifoo wa lam yaqturoo wa kaana baina dzaalika qawaamaa",
    translation: 'Ya Tuhan kami, jadikanlah kami termasuk orang-orang yang apabila membelanjakan (harta), mereka tidak berlebihan dan tidak pula kikir, dan adalah (pembelanjaan itu) di tengah-tengah antara yang demikian.',
    category: 'Utama'
  },
  {
    id: 320,
    title: 'Doa Memohon Dimuliakan Tempat Tinggal Dunia Akhirat',
    arabic: 'رَبِّ أَدْخِلْنِيْ مُدْخَلَ صِدْقٍ وَأَخْرِجْنِيْ مُخْرَجَ صِدْقٍ',
    latin: "Rabbi adkhilnii mudkhala shidqin wa akhrijnii mukhraja shidqin",
    translation: 'Ya Tuhanku, masukkanlah aku secara masuk yang benar dan keluarkanlah aku secara keluar yang benar.',
    category: 'Utama'
  },
  {
    id: 321,
    title: 'Doa Memohon Kekuasaan dan Pertolongan yang Nyata dari Allah',
    arabic: 'وَاجْعَلْ لِيْ مِنْ لَدُنْكَ سُلْطَانًا نَصِيْرًا',
    latin: "Waj-'al lii min ladunka sulthaanan-nashiiraa",
    translation: 'Dan jadikanlah bagiku dari sisi-Mu kekuasaan (pertolongan/argumen) yang menolong.',
    category: 'Utama'
  },
  {
    id: 322,
    title: 'Doa Mohon Dijauhkan dari Sifat Suka Menunda-nunda Pekerjaan (Taswif)',
    arabic: 'اَللّٰهُمَّ أَعِنِّيْ عَلَى الْعَمَلِ الصَّالِحِ فِيْ وَقْتِهِ وَلَا تَجْعَلْنِيْ مِنَ الْمُسَوِّفيْنَ',
    latin: "Allaahumma a'innii 'alal-'amalish-shaalihi fii waqtihi wa laa taj-'alnii minal-musawwifiin",
    translation: 'Ya Allah, bantulah aku untuk mengerjakan amal shalih pada waktunya dan janganlah Engkau jadikan aku termasuk orang-orang yang suka menunda-nunda pekerjaan.',
    category: 'Utama'
  },
  {
    id: 323,
    title: 'Doa Saat Memiliki Anak yang Susah Diatur / Nakal (QS. Al-Ahqaf)',
    arabic: 'رَبِّ أَصْلِحْ لِيْ فِيْ ذُرِّيَّتِيْ إِنِّيْ تُبْتُ إِلَيْكَ وَإِنِّيْ مِنَ الْمُسْلِمِيْنَ',
    latin: "Rabbi ashlih lii fii dzurriyyatii innii tubtu ilaika wa innii minal-muslimiin",
    translation: 'Ya Tuhanku, berilah kebaikan kepadaku dengan (memberi kebaikan) kepada anak cucuku. Sesungguhnya aku bertaubat kepada-Mu dan sesungguhnya aku termasuk orang-orang yang berserah diri.',
    category: 'Utama'
  },
  {
    id: 324,
    title: 'Doa Saat Mengalami Kegagalan dalam Meraih Cita-cita (Memohon Kebesaran Jiwa)',
    arabic: 'اَللّٰهُمَّ رَضِّنِيْ بِقَضَائِكَ وَصَبِّرْنِيْ عَلَى طَاعَتِكَ وَاجْعَلْ لِيْ فَرَجًا مَخْرَجًا',
    latin: "Allaahumma radhdhinii biqadhaa'ika wa sabbirnii 'alaa thaa'atika waj-'al lii farajan makhrajaa",
    translation: 'Ya Allah, jadikanlah aku ridha dengan keputusan-Mu, berilah aku kesabaran untuk selalu taat kepada-Mu, dan jadikanlah bagiku jalan keluar yang lapang.',
    category: 'Utama'
  },
  {
    id: 325,
    title: 'Doa Ketika Hendak Mandi Wiladah / Mandi Setelah Melahirkan',
    arabic: 'نَوَيْتُ الْغُسْلَ لِرَفْعِ الْحَدَثِ الْأَكْبَرِ مِنَ النِّفَاسِ فَرْضًا لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla liraf'il-hadatsil-akbari minan-nifaasi fardhan lillaahi ta'aalaa",
    translation: 'Aku niat mandi untuk menghilangkan hadas besar dari nifas, fardhu karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 326,
    title: 'Doa Ketika Menginginkan Keberkahan dalam Menuntut Ilmu (Pagi Hari)',
    arabic: 'اَللّٰهُمَّ انْفَعْنِيْ بِمَا عَلَّمْتَنِيْ، وَعَلِّمْنِيْ مَا يَنْفَعُنِيْ، وَزِدْنِيْ عِلْمًا',
    latin: "Allaahumm-anfa'nii bimaa 'allamtanii, wa 'allimnii maa yanfa'unii, wa zidnii 'ilman",
    translation: 'Ya Allah, berilah manfaat kepadaku atas apa yang Engkau ajarkan kepadaku, ajarkanlah kepadaku apa yang bermanfaat bagiku, dan tambahkanlah ilmu kepadaku.',
    category: 'Utama'
  },
  {
    id: 327,
    title: 'Doa Ketika Terpesona pada Harta Benda (Biar Tidak Takjub Dunia)',
    arabic: 'اَللّٰهُمَّ لَا عَيْشَ إِلَّا عَيْشُ الْآخِرَةِ',
    latin: "Allaahumma laa 'aysya illaa 'aysyul-aakhirah",
    translation: 'Ya Allah, tidak ada kehidupan yang hakiki melainkan kehidupan akhirat.',
    category: 'Utama'
  },
  {
    id: 328,
    title: 'Doa Agar Anak Terhindar dari Kemaksiatan / Zina (Doa Rasulullah)',
    arabic: 'اَللّٰهُمَّ اغْفِرْ ذَنْبَهُ وَطَهِّرْ قَلْبَهُ وَحَصِّنْ فَرْجَهُ',
    latin: "Allaahummagh-fir dzanbahu wa thahhir qalbahu wa hash-shin farjahu",
    translation: 'Ya Allah, ampunilah dosanya, bersihkanlah hatinya, dan jagalah kemaluannya (aurat/kehormatannya).',
    category: 'Utama'
  },
  {
    id: 329,
    title: 'Doa Ketika Melihat Musuh / Penjahat Gemetar Ketakutan',
    arabic: 'اَللّٰهُمَّ أَدْخِلِ الْهَيْبَةَ فِيْ قُلُوْبِهِمْ وَاكْفِنِيْ شَرَّهُمْ',
    latin: "Allaahumma adkhilil-haibata fii quluubihim wakfinii syarrahum",
    translation: 'Ya Allah, masukkanlah rasa takut/kewibawaan ke dalam hati mereka dan cukupkanlah aku dari kejahatan mereka.',
    category: 'Utama'
  },
  {
    id: 330,
    title: 'Doa Ketika Mengalami Sakit Gigi / Nyeri di Tubuh',
    arabic: 'اَللّٰهُمَّ أَذْهِبْ عَنِّيْ شَرَّ مَا أَجِدُ وَأُحَاذِرُ بِعِزَّتِكَ',
    latin: "Allaahumma adzhib 'annii syarra maa ajidu wa uhaadziru bi'zzatika",
    translation: 'Ya Allah, hilangkanlah dariku keburukan apa yang aku rasakan dan aku khawatirkan dengan keagungan-Mu.',
    category: 'Harian'
  },
  {
    id: 331,
    title: 'Doa Memohon Diberikan Anak yang Cerdas & Sholeh',
    arabic: 'رَبِّ هَبْ لِيْ مِنَ الصَّالِحِيْنَ ذُرِّيَّةً طَيِّبَةً',
    latin: "Rabbi hab lii minash-shaalihiina dzurriyyatan thayyibah",
    translation: 'Ya Tuhanku, anugerahkanlah kepadaku dari golongan orang-orang shalih keturunan yang baik.',
    category: 'Utama'
  },
  {
    id: 332,
    title: 'Doa Memohon Keselamatan Menjelang Tindakan Medis',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ السَّلَامَةَ وَالْعَافِيَةَ فِيْ كُلِّ أَمْرِيْ',
    latin: "Allaahumma innii as'alukas-salaamata wal-'aafiyata fii kulli amrii",
    translation: 'Ya Allah, sesungguhnya aku memohon keselamatan dan kesehatan dalam setiap urusanku.',
    category: 'Utama'
  },
  {
    id: 333,
    title: 'Doa Ketika Hendak Memulai Ujian / Ujian Sekolah / Tes Kerja',
    arabic: 'رَبِّ يَسِّرْ وَلَا تُعَسِّرْ وَتَمِّمْ بِالْخَيْرِ',
    latin: "Rabbi yassir wa laa tu'assir wa tammim bil-khair",
    translation: 'Ya Tuhanku mudahkanlah dan jangan dipersulit, serta akhirilah dengan kebaikan.',
    category: 'Utama'
  },
  {
    id: 334,
    title: 'Doa Ketika Hendak Memasuki Ruang Operasi / Menjalani Tindakan Medis',
    arabic: 'اَللّٰهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِ أَنْتَ الشَّافِيْ لَا شِفَاءَ إِلَّا شِفَاؤُكَ',
    latin: "Allaahumma rabban-naasi adzhibil-ba'sa isyfi antasy-syaafii laa syifaa'a illaa syifaa'uka",
    translation: 'Ya Allah, Tuhan pemelihara manusia, hilangkanlah penyakit ini, sembuhkanlah karena Engkaulah Yang Maha Menyembuhkan, tidak ada kesembuhan kecuali kesembuhan dari-Mu.',
    category: 'Harian'
  },
  {
    id: 335,
    title: 'Doa Memohon Keamanan Diri dan Harta Saat Keluar Rumah (Dzikir Pendek)',
    arabic: 'بِسْمِ اللّٰهِ تَوَكَّلْتُ عَلَى اللّٰهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ',
    latin: "Bismillaahi tawakkaltu 'alallaahi laa hawla wa laa quwwata illaa billaah",
    translation: 'Dengan nama Allah aku bertawakkal kepada Allah, tidak ada daya dan kekuatan melainkan dengan pertolongan Allah.',
    category: 'Aktivitas'
  },
  {
    id: 336,
    title: 'Doa Agar Selalu Diberikan Hati yang Ikhlas dalam Beramal',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الرِّيَاءِ وَالسُّمْعَةِ فِيْ عَمَلِيْ',
    latin: "Allaahumma innii a'uudzu bika minar-riyaa'i was-sum'ati fii 'amalii",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari sifat riya\' (pamer) dan sum\'ah (ingin didengar kebaikan) dalam amalku.',
    category: 'Utama'
  },
  {
    id: 337,
    title: 'Doa Ketika Mendapatkan Keberhasilan / Sukses dalam Pekerjaan',
    arabic: 'سَجَدَ وَجْهِيْ لِلَّذِيْ خَلَقَهُ وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ',
    latin: "Sajada wajhii lilladzii khalaqahu wa syaqqa sam'ahu wa basharahu bihawlihi wa quwwatihi",
    translation: 'Wajahku bersujud kepada Dzat yang menciptakannya, membelah pendengaran dan penglihatannya dengan daya dan kekuatan-Nya.',
    category: 'Ibadah'
  },
  {
    id: 338,
    title: 'Doa Ketika Berkunjung / Ziarah ke Makam Orang Tua',
    arabic: 'اَللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَعَافِهِمْ وَاعْفُ عَنْهُمْ وَأَكْرِمْ نُزُلَهُمْ',
    latin: "Allaahummagh-fir lahum warhamhum wa 'aafihim wa'fu 'anhum wa akrim nuzulahum",
    translation: 'Ya Allah, ampunilah mereka, rahmatilah mereka, sejahterakanlah mereka, maafkanlah mereka, dan muliakanlah tempat tinggal mereka.',
    category: 'Utama'
  },
  {
    id: 339,
    title: 'Doa Ketika Khawatir Menyebabkan Orang Lain Kecewa',
    arabic: 'اَللّٰهُمَّ لَا تَجْعَلْنِيْ عِبْئًا عَلَى أَحَدٍ مِنْ خَلْقِكَ',
    latin: "Allaahumma laa taj-'alnii 'ib'an 'alaa ahadin min khalqik",
    translation: 'Ya Allah, janganlah Engkau jadikan aku sebagai beban bagi siapa pun di antara makhluk-Mu.',
    category: 'Utama'
  },
  {
    id: 340,
    title: 'Doa Memohon Kesehatan Gigi dan Menghilangkan Nyeri Gusi',
    arabic: 'اَللّٰهُمَّ عَافِ لِيْ أَسْنَانِيْ وَأَذْهِبْ عَنِّيْ وَجَعَهَا بِرَحْمَتِكَ',
    latin: "Allaahumma 'aafi lii asnaanii wa adzhib 'annii waja'ahaa birahmatika",
    translation: 'Ya Allah, sehatkanlah gigi-gigiku dan hilangkanlah rasa sakitnya dariku dengan rahmat-Mu.',
    category: 'Harian'
  },
  {
    id: 341,
    title: 'Doa Memohon Dilindungi dari Bencana Gempa Bumi dan Tanah Longsor',
    arabic: 'اَللّٰهُمَّ احْفَظْنَا مِنْ زَلَازِلِ الْأَرْضِ وَخَسْفِهَا',
    latin: "Allaahummah-fazhnaa min zalaazilil-ardhi wa khasfihaa",
    translation: 'Ya Allah, lindungilah kami dari gempa bumi dan tanah longsor (ambles bumi).',
    category: 'Alam'
  },
  {
    id: 342,
    title: 'Doa Mohon Terhindar dari Sifat Suka Mengeluh',
    arabic: 'اَللّٰهُمَّ رَضِّنِيْ بِمَا قَضَيْتَ وَعَافِنيْ فِيْمَا أَبْقَيْتَ',
    latin: "Allaahumma radhdhinii bimaa qadhayta wa 'aafinii fiimaa abqayta",
    translation: 'Ya Allah, jadikanlah aku merasa puas dengan keputusan-Mu, dan berilah aku keselamatan pada apa yang Engkau sisakan.',
    category: 'Utama'
  },
  {
    id: 343,
    title: 'Doa Agar Selalu Diingatkan untuk Bertaubat (Dzikir Istighfar)',
    arabic: 'اَسْتَغْفِرُ اللّٰهَ الْعَظِيْمَ الَّذِيْ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّوْمُ وَأَتُوْبُ إِلَيْهِ',
    latin: "Astaghfirullaahal-'azhiimalladzii laa ilaaha illaa huwal-hayyul-qayyoomu wa atoobu ilaih",
    translation: 'Aku memohon ampunan kepada Allah Yang Maha Agung, yang tiada Tuhan selain Dia, Yang Maha Hidup lagi Maha Berdiri Sendiri, dan aku bertaubat kepada-Nya.',
    category: 'Utama'
  },
  {
    id: 344,
    title: 'Doa Memohon Keluarga yang Bahagia dan Sakinah',
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ',
    latin: "Rabbanaa hab lanaa min azwaajinaa wa dzurriyyaatinaa qurrata a'yun",
    translation: 'Ya Tuhan kami, anugerahkanlah kepada kami pasangan-pasangan kami dan keturunan kami sebagai penyenang hati (kami).',
    category: 'Utama'
  },
  {
    id: 345,
    title: 'Doa Ketika Hendak Mandi Sunnah Hari Raya (Idul Fitri / Idul Adha)',
    arabic: 'نَوَيْتُ الْغُسْلَ لِعِيْدِ الْفِطْرِ / الْأَضْحَى سُنَّةً لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla li'eedil-fithri / al-adh-haa sunnatan lillaahi ta'aalaa",
    translation: 'Aku niat mandi untuk hari raya Idul Fitri / Idul Adha, sunnah karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 346,
    title: 'Doa Agar Diberi Kebersihan Hati dari Rasa Sombong',
    arabic: 'اَللّٰهُمَّ نَقِّ قَلْبِيْ مِنَ الْكِبْرِ وَالْعُجْبِ وَالْحَسَدِ',
    latin: "Allaahumma naqqi qalbii minal-kibri wal-'ujbi wal-hasad",
    translation: 'Ya Allah, bersihkanlah hatiku dari kesombongan, bangga diri (ujub), dan rasa iri dengki.',
    category: 'Utama'
  },
  {
    id: 347,
    title: 'Doa Ketika Berada di Atas Kendaraan yang Melaju Kencang',
    arabic: 'سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هٰذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ',
    latin: "Subhaanalladzii sakh-khara lanaa haadzaa wa maa kunnaa lahu muqriniin",
    translation: 'Maha Suci Allah yang telah menundukkan kendaraan ini bagi kami, padahal kami sebelumnya tidak mampu menguasainya.',
    category: 'Aktivitas'
  },
  {
    id: 348,
    title: 'Doa Memohon Penjagaan Diri dari Godaan Harta Haram',
    arabic: 'اَللّٰهُمَّ اغْنِنِيْ بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِيْ بِفَضْلِكَ',
    latin: "Allaahummak-finii bihalaalika 'an haraamika wa aghninii bifadhlika",
    translation: 'Ya Allah, cukupkanlah aku dengan rezeki-Mu yang halal agar terhindar dari yang haram, dan kayakanlah aku dengan karunia-Mu.',
    category: 'Utama'
  },
  {
    id: 349,
    title: 'Doa Ketika Terkena Sengatan Serangga / Lebah / Kalajengking',
    arabic: 'اَللّٰهُمَّ أَذْهِبْ عَنِّيْ سَمَّهَا وَأَلَمَهَا بِرَحْمَتِكَ',
    latin: "Allaahumma adzhib 'annii sammahaa wa alamahaa birahmatika",
    translation: 'Ya Allah, hilangkanlah racun sengatannya dan rasa sakitnya dariku dengan rahmat-Mu.',
    category: 'Harian'
  },
  {
    id: 350,
    title: 'Doa Ketika Terpesona pada Anak Kecil yang Lucu (Agar Terhindar dari Ain)',
    arabic: 'مَا شَاءَ اللّٰهُ لَا قُوَّةَ إِلَّا بِاللّٰهِ، اَللّٰهُمَّ بَارِكْ فِيْهِ',
    latin: "Maa syaa'allaahu laa quwwata illaa billaah, Allaahumma baarik fiih",
    translation: 'Sungguh atas kehendak Allah, tidak ada kekuatan melainkan dengan pertolongan Allah. Ya Allah, berkahilah dia (anak ini).',
    category: 'Harian'
  },
  {
    id: 351,
    title: 'Doa Mohon Dijauhkan dari Sifat Tergesa-gesa (Al-\'Ajal)',
    arabic: 'اَللّٰهُمَّ اجْعَلْ فِيْ أَمْرِيْ التَّأَنِّيْ وَالتَّثَبُّتَ',
    latin: "Allaahummaj-'al fii amriyt-ta'anniya wat-tatsabbut",
    translation: 'Ya Allah, jadikanlah dalam urusanku sifat tenang/hati-hati dan ketetapan hati yang kuat.',
    category: 'Utama'
  },
  {
    id: 352,
    title: 'Doa Ketika Menginginkan Keberkahan dalam Karir / Pekerjaan',
    arabic: 'اَللّٰهُمَّ بَارِكْ لَنَا فِيْ أَعَمَالِنَا وَارْزُقْنَا مِنْ حَيْثُ لَا نَحْتَسِبُ',
    latin: "Allaahumma baarik lanaa fii a'maalinaa warzuqnaa min haytsu laa nahtasib",
    translation: 'Ya Allah, berkahilah kami dalam pekerjaan kami, dan limpahkanlah rezeki kepada kami dari arah yang tidak kami duga-duga.',
    category: 'Utama'
  },
  {
    id: 353,
    title: 'Doa Ketika Menghadapi Kegagalan dalam Ujian / Ikhtiar',
    arabic: 'قَدَّرَ اللّٰهُ وَمَا شَاءَ فَعَلَ',
    latin: "Qaddarallaahu wa maa syaa'a fa'ala",
    translation: 'Allah telah mentakdirkannya, dan apa yang Dia kehendaki pasti Dia perbuat.',
    category: 'Harian'
  },
  {
    id: 354,
    title: 'Doa Agar Diberi Kemudahan Melunasi Hutang Sebesar Gunung',
    arabic: 'اَللّٰهُمَّ مَالِكَ الْمُلْكِ تُؤْتِيْ الْمُلْكَ مَنْ تَشَاءُ، اِقْضِ عَنِّيْ الدَّيْنَ وَأَغْنِنِيْ مِنَ الْفَقْرِ',
    latin: "Allaahumma maalikam-mulki tu'tiyl-mulka man tasyaau... Iqdhi 'anniyd-dayna wa aghninii minal-faqr",
    translation: 'Ya Allah, Pemilik seluruh kerajaan, Engkau berikan kekuasaan kepada siapa yang Engkau kehendaki... Lunasilah hutangku dan bebaskanlah aku dari kemiskinan.',
    category: 'Utama'
  },
  {
    id: 355,
    title: 'Doa Memohon Perlindungan dari Kawan yang Berkhianat dalam Bisnis',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْخِيَانَةِ فِيْ أَمْوَالِنَا وَأَعْمَالِنَا',
    latin: "Allaahumma innii a'uudzu bika minal-khiyaanati fii amwaalinaa wa a'maalinaa",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari pengkhianatan dalam harta benda dan pekerjaan kami.',
    category: 'Utama'
  },
  {
    id: 356,
    title: 'Doa Ketika Masuk Toko / Tempat Usaha Sendiri',
    arabic: 'اَللّٰهُمَّ افْتَحْ لَنَا أَبْوَابَ رَحْمَتِكَ وَارْزُقْنَا خَيْرَ هٰذَا الْمَكَانِ',
    latin: "Allaahummaftah lanaa abwaaba rahmatika warzuqnaa khayra haadzal-makaan",
    translation: 'Ya Allah, bukakanlah bagi kami pintu-pintu rahmat-Mu dan limpahkanlah kebaikan tempat ini kepada kami.',
    category: 'Aktivitas'
  },
  {
    id: 357,
    title: 'Doa Ketika Berada di Puncak Gunung / Tempat Tinggi (Melihat Keindahan)',
    arabic: 'سُبْحَانَ اللّٰهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ',
    latin: "Subhaanallaahi wal-hamdu lillaahi wa laa ilaaha illallaahu wallaahu Akbar",
    translation: 'Maha Suci Allah, segala puji bagi Allah, tiada Tuhan selain Allah, dan Allah Maha Besar.',
    category: 'Alam'
  },
  {
    id: 358,
    title: 'Doa Saat Hendak Tidur Agar Terhindar dari Gangguan Mimpi Buruk',
    arabic: 'اَللّٰهُمَّ بِاسْمِكَ أَضَعُ جَنْبِيْ فَاغْفِرْ لِيْ ذَنْبِيْ',
    latin: "Allaahumma bismika adha'u janbii faghfir lii dzanbii",
    translation: 'Ya Allah, dengan nama-Mu aku baringkan tubuhku, maka ampunilah dosa-dosaku.',
    category: 'Harian'
  },
  {
    id: 359,
    title: 'Doa Memohon Ditinggikan Derajat Serta Diberikan Kehormatan di Mata Manusia',
    arabic: 'رَبِّ اجْعَلْنِيْ مَهِيْبًا فِيْ قُلُوْبِ النَّاسِ وَأَعِزَّنِيْ بِطَاعَتِكَ',
    latin: "Rabbi-j'alnii mahiiban fii quluobin-naasi wa a'izzanii bi-thaa'atik",
    translation: 'Ya Tuhanku, jadikanlah aku orang yang berwibawa/dihormati di dalam hati manusia, dan muliakanlah aku dengan ketaatan kepada-Mu.',
    category: 'Utama'
  },
  {
    id: 360,
    title: 'Doa Memohon Kelancaran Lisan & Ketepatan Bicara (Saat Wawancara / Presentasi)',
    arabic: 'اَللّٰهُمَّ اهْدِ قَلْبِيْ وَسَدِّدْ لِسَانِيْ',
    latin: "Allaahummahdii qalbii wa saddid lisaanii",
    translation: 'Ya Allah, tunjukilah hatiku dan tepatkanlah ucapan lisanku.',
    category: 'Utama'
  },
  {
    id: 361,
    title: 'Doa Ketika Hendak Memasuki Kantor / Tempat Kerja di Pagi Hari',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ هٰذَا الْعَمَلِ وَخَيْرَ مَا فِيْهِ',
    latin: "Allaahumma innii as'aluka khaira haadzal-'amali wa khaira maa fiih",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan pekerjaan ini dan kebaikan apa yang ada di dalamnya.',
    category: 'Aktivitas'
  },
  {
    id: 362,
    title: 'Doa Ketika Selesai Bekerja / Pulang dari Tempat Kerja',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ مَا صَنَعْتُ وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ',
    latin: "Allaahumma innii as'aluka khaira maa shana'tu wa a'uudzu bika min syarri maa shana'tu",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan dari apa yang telah aku kerjakan, dan aku berlindung kepada-Mu dari keburukan apa yang telah aku kerjakan.',
    category: 'Aktivitas'
  },
  {
    id: 363,
    title: 'Doa Agar Usaha Dagang / Toko Terhindar dari Kerugian & Kebangkrutan',
    arabic: 'اَللّٰهُمَّ لاَ خَسَارَةَ فِيْ تِجَارَتِنَا وَاجْعَلْهَا رَابِحَةً مُبَارَكَةً',
    latin: "Allaahumma laa khasaarata fii tijaaratinaa waj-'alhaa raabihatan mubaarakah",
    translation: 'Ya Allah, janganlah ada kerugian dalam perdagangan kami, dan jadikanlah ia perdagangan yang menguntungkan lagi diberkahi.',
    category: 'Utama'
  },
  {
    id: 364,
    title: 'Doa Ketika Terjadi Perselisihan Antara Teman / Rekan Kerja (Mohon Rukun)',
    arabic: 'اَللّٰهُمَّ أَلِّفْ بَيْنَ قُلُوْبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا',
    latin: "Allaahumma allif baina quluubinaa wa ashlih dzaata baininaa",
    translation: 'Ya Allah, satukanlah di antara hati kami, dan perbaikilah hubungan di antara kami.',
    category: 'Utama'
  },
  {
    id: 365,
    title: 'Doa Ketika Hendak Menanam Pohon / Biji-bijian (Bercocok Tanam)',
    arabic: 'اَللّٰهُمَّ اجْعَلْهُ حَبًّا مُبَارَكًا وَنَبَاتًا حَسَنًا',
    latin: "Allaahummaj-'alhu habban mubaarakan wa nabaatan hasanaa",
    translation: 'Ya Allah, jadikanlah benih ini benih yang diberkahi dan tanaman yang tumbuh dengan baik.',
    category: 'Aktivitas'
  },
  {
    id: 366,
    title: 'Doa Ketika Hendak Mandi Sunnah Gerhana (Matahari / Bulan)',
    arabic: 'نَوَيْتُ الْغُسْلَ لِخُسُوْفِ الْقَمَرِ / كُسُوْفِ الشَّمْسِ سُنَّةً لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla likhusoofil-qamari / kusoofisy-syamsi sunnatan lillaahi ta'aalaa",
    translation: 'Aku niat mandi untuk gerhana bulan / gerhana matahari, sunnah karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 367,
    title: 'Doa Ketika Terjadi Hujan Disertai Badai Guntur',
    arabic: 'اَللّٰهُمَّ لاَ تَقْتُلْنَا بِغَضَبِكَ وَلاَ تُهْلِكْنَا بِعَذَابِكَ',
    latin: "Allaahumma laa taqtulnaa bighadhabika wa laa tuhliknaa bi'adzaabika",
    translation: 'Ya Allah, janganlah Engkau bunuh kami dengan kemurkaan-Mu, dan janganlah Engkau binasakan kami dengan azab-Mu.',
    category: 'Alam'
  },
  {
    id: 368,
    title: 'Doa Saat Terjadi Kebakaran Besar',
    arabic: 'اَللّٰهُ أَكْبَرُ (يُكَبَّرُ ثَلَاثًا)',
    latin: "Allaahu Akbar (dibaca 3 kali atau lebih dengan suara lantang)",
    translation: 'Allah Maha Besar. (Takbir dibaca saat memadamkan api, karena takbir dapat meredam kobaran api).',
    category: 'Alam'
  },
  {
    id: 369,
    title: 'Doa Memohon Pasangan Hidup yang Setia dan Sholeh / Sholehah',
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا قُرَّةَ أَعْيُنٍ',
    latin: "Rabbanaa hab lanaa min azwaajinaa qurrata a'yun",
    translation: 'Ya Tuhan kami, anugerahkanlah kepada kami pasangan-pasangan kami sebagai penyenang hati (kami).',
    category: 'Utama'
  },
  {
    id: 370,
    title: 'Doa Memohon Keselamatan dari Siksa Api Neraka secara Khusus',
    arabic: 'رَبَّنَا اصْرِف| عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَامًا',
    latin: "Rabbanas-rif 'annaa 'adzaaba jahannama inna 'adzaabahaa kaana gharaamaa",
    translation: 'Ya Tuhan kami, jauhkanlah azab jahanam dari kami, karena sesungguhnya azabnya itu adalah kebinasaan yang kekal.',
    category: 'Utama'
  },
  {
    id: 371,
    title: 'Doa Ketika Berhadapan dengan Binatang Buas / Ular di Perjalanan',
    arabic: 'سَلَامٌ عَلَىٰ نُوحٍ فِي الْعَالَمِينَ',
    latin: "Salaamun 'alaa noohin fil-'aalamiin",
    translation: 'Kesejahteraan dilimpahkan atas Nabi Nuh di seluruh alam. (Ayat perlindungan dari gigitan ular/binatang berbisa).',
    category: 'Aktivitas'
  },
  {
    id: 372,
    title: 'Doa Ketika Mengalami Kram / Pegal di Kaki atau Tangan',
    arabic: 'اَللّٰهُمَّ أَذْهِبْ عَنِّيْ هٰذَا الْوَجَعَ وَعَافِنِيْ بِرَحْمَتِكَ',
    latin: "Allaahumma adzhib 'annii haadzal-waj'a wa 'aafinii birahmatika",
    translation: 'Ya Allah, hilangkanlah rasa sakit/kram ini dariku dan sehatkanlah aku dengan rahmat-Mu.',
    category: 'Harian'
  },
  {
    id: 373,
    title: 'Doa Ketika Merasa Sungkan / Malu Meminta Bantuan Orang Lain',
    arabic: 'اَللّٰهُمَّ اكْفِنِيْ بِفَضْلِكَ وَلَا تَجْعَلْنِيْ مُحْتَاجًا إِلَى غَيْرِكَ',
    latin: "Allaahummak-finii bifadhlika wa laa taj-'alnii muhtaajan ilaa ghayrik",
    translation: 'Ya Allah, cukupkanlah aku dengan karunia-Mu dan janganlah Engkau jadikan aku bergantung/butuh kepada selain-Mu.',
    category: 'Utama'
  },
  {
    id: 374,
    title: 'Doa Ketika Terpesona pada Harta Milik Orang Lain (Agar Tidak Iri)',
    arabic: 'مَاشَاءَ اللّٰهُ لَا قُوَّةَ إِلَّا بِاللّٰهِ، اَللّٰهُمَّ بَارِكْ لَهُمْ فِيْهِ',
    latin: "Maasyaa-allaahu laa quwwata illaa billaah, Allaahumma baarik lahum fiih",
    translation: 'Sungguh atas kehendak Allah, tidak ada kekuatan melainkan dengan pertolongan Allah. Ya Allah, berkahilah harta mereka ini.',
    category: 'Harian'
  },
  {
    id: 375,
    title: 'Doa Perlindungan dari Teman yang Bermuka Dua (Munafik)',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ صَاحِبٍ خَدُوْعٍ وَمِنْ صَدِيْقٍ مُنَافِقٍ',
    latin: "Allaahumma innii a'uudzu bika min shaahibin khadoo'in wa min shadiiqin munaafiq",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari rekan yang penipu dan dari teman yang munafik.',
    category: 'Utama'
  },
  {
    id: 376,
    title: 'Doa Saat Hendak Mandi Sunnah Ihram (Haji & Umrah)',
    arabic: 'نَوَيْتُ الْغُسْلَ لِإِحْرَامِ سُنَّةً لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla lil-ihraami sunnatan lillaahi ta'aalaa",
    translation: 'Aku niat mandi untuk ihram, sunnah karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 377,
    title: 'Doa Saat Terjadi Angin Puting Beliung / Angin Ribut',
    arabic: 'اَللّٰهُمَّ اجْعَلْهَا رَحْمَةً وَلَا تَجْعَلْهَا عَذَابًا',
    latin: "Allaahummaj-'alhaa rahmatan wa laa taj-'alhaa 'adzaabaa",
    translation: 'Ya Allah, jadikanlah angin ini membawa rahmat (hujan berkah) dan janganlah Engkau jadikan ia sebagai azab/bencana.',
    category: 'Alam'
  },
  {
    id: 378,
    title: 'Doa Memohon Ditunjukkan Kebenaran Sejati',
    arabic: 'اَللّٰهُمَّ أَرِنَا الْحَقَّ حَقًّا وَارْزُقْنَا اتِّبَاعَهُ',
    latin: "Allaahumma arinal-haqqa haqqan warzuqnat-tibaa'ah",
    translation: 'Ya Allah, tunjukkanlah kepada kami bahwa yang benar itu benar dan karuniakanlah kekuatan bagi kami untuk mengikutinya.',
    category: 'Utama'
  },
  {
    id: 379,
    title: 'Doa Ketika Menghadapi Orang yang Menghujat / Mencaci Kita',
    arabic: 'حَسْبِيَ اللّٰهُ وَنِعْمَ الْوَكِيْلُ عَلَى مَنْ ظَلَمَنِيْ',
    latin: "Hasbiyallaahu wa ni'mal-wakiilu 'alaa man zhalamaney",
    translation: 'Cukuplah Allah bagiku sebagai penolong, dan Dia adalah sebaik-baik pelindung atas orang yang mendzalimiku.',
    category: 'Harian'
  },
  {
    id: 380,
    title: 'Doa Memohon Jiwa yang Tenang & Terjaga Kesuciannya',
    arabic: 'اَللّٰهُمَّ اٰتِ نَفْسِيْ تَقْوَاهَا وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا',
    latin: "Allaahumma aati nafsii taqwaahaa wa zakkihaa anta khairu man zakkaahaa",
    translation: 'Ya Allah, berikanlah ketakwaan pada jiwaku, dan bersihkanlah ia, Engkaulah sebaik-baik yang membersihkannya.',
    category: 'Utama'
  },
  {
    id: 381,
    title: 'Doa Saat Hendak Mandi Sunnah Wukuf di Arafah',
    arabic: 'نَوَيْتُ الْغُسْلَ لِلْوُقُوْفِ بِعَرَفَةَ سُنَّةً لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla lil-wuqoofi bi-'arafata sunnatan lillaahi ta'aalaa",
    translation: 'Aku niat mandi untuk wukuf di Arafah, sunnah karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 382,
    title: 'Doa Ketika Melihat Seseorang Terkena Penyakit Menular',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ عَافَانِيْ مِمَّا ابْتَلَاهُ بِهِ',
    latin: "Al-hamdu lillaahilladzii 'aafaanii mimmab-talaahu bih",
    translation: 'Segala puji bagi Allah yang telah menyelamatkan aku dari musibah/penyakit yang menimpanya.',
    category: 'Harian'
  },
  {
    id: 383,
    title: 'Doa Memohon Pasangan yang Setia Sampai Akhir Hayat',
    arabic: 'رَبَّنَا اجْعَلْنَا لِبَعْضِنَا سَكَنًا وَمَوَدَّةً وَرَحْمَةً',
    latin: "Rabbanaj-'alnaa liba'dhinaa sakanan wa mawaddatan wa rahmatan",
    translation: 'Ya Tuhan kami, jadikanlah kami (suami-istri) sebagai ketenteraman, cinta, dan kasih sayang satu sama lain.',
    category: 'Utama'
  },
  {
    id: 384,
    title: 'Doa Perlindungan dari Rekan Kerja yang Licik',
    arabic: 'اَللّٰهُمَّ اكْفِنِيْ كَيْدَ الْكَائِدِيْنَ وَمَكْرَ الْمَاكِرِيْنَ فِيْ عَمَلِيْ',
    latin: "Allaahummak-finii kaydal-kaa'idiina wa makral-maakiriina fii 'amalii",
    translation: 'Ya Allah, cukupkanlah aku dari tipu daya orang-orang yang licik dan makar orang-orang yang jahat dalam pekerjaanku.',
    category: 'Utama'
  },
  {
    id: 385,
    title: 'Doa Agar Selalu Dipermudah dalam Menghafal Al-Qur\'an',
    arabic: 'اَللّٰهُمَّ سَهِّلْ عَلَيَّ حِفْظَ كِتَابِكَ وَثَبِّتْهُ فِيْ صَدْرِيْ',
    latin: "Allaahumma sahhil 'alayya hifzha kitaabika wa tsabbithu fii shadrii",
    translation: 'Ya Allah, mudahkanlah bagiku untuk menghafal kitab-Mu dan kokohkanlah ia di dalam dadaku.',
    category: 'Utama'
  },
  {
    id: 386,
    title: 'Doa Saat Terjadi Badai Salju / Cuaca Dingin Ekstrem',
    arabic: 'اَللّٰهُمَّ احْمِ بِلَادَنَا مِنَ الْقُرِّ وَالصَّقِيْعِ وَعَافِنَا بِرَحْمَتِكَ',
    latin: "Allaahummah-mi bilaadanaa minal-qurri was-saqii'i wa 'aafinaa birahmatika",
    translation: 'Ya Allah, lindungilah negeri kami dari cuaca dingin ekstrem dan badai salju, serta sehatkanlah kami dengan rahmat-Mu.',
    category: 'Alam'
  },
  {
    id: 387,
    title: 'Doa Memohon Keselamatan dari Sifat Dendam dan Permusuhan',
    arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا',
    latin: "Rabbana-ghfir lanaa wa li-ikhwaaninal-ladziina sabaquunaa bil-iimaani wa laa taj-'al fii quluobinaa ghillan lil-ladziina aamanuu",
    translation: 'Ya Tuhan kami, ampunilah kami dan saudara-saudara kami yang telah beriman lebih dulu dari kami, dan janganlah Engkau membiarkan kedengkian dalam hati kami terhadap orang-orang yang beriman.',
    category: 'Utama'
  },
  {
    id: 388,
    title: 'Doa Saat Mendengar Kicauan Burung di Pagi Hari',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ جَعَلَ لَنَا فِيْ خَلْقِهِ اٰيَاتٍ لِلْمُتَوَسِّمِيْنَ',
    latin: "Al-hamdu lillaahilladzii ja'ala lanaa fii khalqihii aayaatin lil-mutawassimiin",
    translation: 'Segala puji bagi Allah yang telah menjadikan bagi kami tanda-tanda kebesaran pada ciptaan-Nya bagi orang-orang yang memperhatikan.',
    category: 'Alam'
  },
  {
    id: 389,
    title: 'Doa Saat Hendak Mandi Sunnah Masuk Kota Madinah',
    arabic: 'نَوَيْتُ الْغُسْلَ لِدُخُوْلِ مَدِيْنَةِ الرَّسُوْلِ سُنَّةً لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla lidukhuoli madiinatir-rasuoli sunnatan lillaahi ta'aalaa",
    translation: 'Aku niat mandi untuk memasuki kota Madinah Rasulullah, sunnah karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 390,
    title: 'Doa Saat Merasa Jenuh Belajar / Menuntut Ilmu',
    arabic: 'اَللّٰهُمَّ جَدِّدِ الْإِيْمَانَ وَالْهِمَّةَ فِيْ قَلْبِيْ وَأَعِذْنِيْ مِنَ الْفُتُوْرِ',
    latin: "Allaahumma jaddidil-iimaana wal-himmata fii qalbii wa a'idznii minal-futuur",
    translation: 'Ya Allah, perbaruilah keimanan dan semangat di dalam hatiku, dan lindungilah aku dari rasa jenuh/futur.',
    category: 'Harian'
  },
  {
    id: 391,
    title: 'Doa Ketika Hendak Memotong Kuku pada Hari Jumat',
    arabic: 'بِسْمِ اللّٰهِ وَبِاللّٰهِ وَعَلَى سُنَّةِ مُحَمَّدٍ وَاٰلِ مُحَمَّدٍ',
    latin: "Bismillaahi wa billaahi wa 'alaa sunnati Muhammadin wa aali Muhammad",
    translation: 'Dengan nama Allah, dan dengan pertolongan Allah, serta di atas sunnah Nabi Muhammad dan keluarga Nabi Muhammad.',
    category: 'Harian'
  },
  {
    id: 392,
    title: 'Doa Ketika Mengalami Mimpi Indah (Agar Menjadi Kenyataan / Berkah)',
    arabic: 'اَللّٰهُمَّ اجْعَلْهَا رُؤْيَا صَالِحَةً مُبَشِّرَةً وَلَا تَجْعَلْهَا أَضْغَاثَ أَحْلَامٍ',
    latin: "Allaahummaj-'alhaa ru'yaa shalihatan mubasysyiratan wa laa taj-'alhaa adghaatsa ahlaam",
    translation: 'Ya Allah, jadikanlah ia mimpi yang baik lagi membawa kabar gembira, dan janganlah Engkau jadikan ia mimpi yang membingungkan.',
    category: 'Harian'
  },
  {
    id: 393,
    title: 'Doa Ketika Melihat Seseorang Mendapat Musibah Duniawi (Bukan Penyakit)',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ عَافَانِيْ مِمَّا ابْتَلَاكَ بِهِ وَفَضَّلَنِيْ عَلَىٰ كَثِيْرٍ مِمَّنْ خَلَقَ تَفْضِيْلًا',
    latin: "Al-hamdu lillaahilladzii 'aafaanii mimmab-talaaka bihii wa faddhalanii 'alaa katsiirin mimman khalaqa tafdhiilaa",
    translation: 'Segala puji bagi Allah yang telah menyelamatkan aku dari musibah yang menimpamu dan melebihkan aku atas kebanyakan makhluk-Nya.',
    category: 'Harian'
  },
  {
    id: 394,
    title: 'Doa Saat Terjadi Gempa Bumi (Mohon Perlindungan)',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيْهَا وَأَعُوْذُ بِكَ مِنْ شَرِّهَا',
    latin: "Allaahumma innii as'aluka khairahaa wa khaira maa fiihaa wa a'uudzu bika min syarrihaa",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikannya dan kebaikan apa yang ada di dalamnya, dan aku berlindung kepada-Mu dari keburukannya.',
    category: 'Alam'
  },
  {
    id: 395,
    title: 'Doa Perlindungan dari Kejahatan Tetangga yang Jahat / Berbuat Dzalim',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ جَارِ السُّوْءِ فِيْ دَارِ الْمُقَامَةِ',
    latin: "Allaahumma innii a'uudzu bika min jaaris-suo'i fii daaril-muqaamah",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari tetangga yang jahat di tempat tinggal yang tetap.',
    category: 'Utama'
  },
  {
    id: 396,
    title: 'Doa Ketika Hendak Mandi Sunnah Memasuki Kota Makkah',
    arabic: 'نَوَيْتُ الْغُسْلَ لِدُخُوْلِ مَكَّةَ الْمُعَظَّمَةِ سُنَّةً لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla lidukhuoli makkatal-mu'azh-zhamati sunnatan lillaahi ta'aalaa",
    translation: 'Aku niat mandi untuk memasuki kota Makkah yang agung, sunnah karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 397,
    title: 'Doa Ketika Menghadapi Tugas Kerja yang Menumpuk dan Sangat Berat',
    arabic: 'اَللّٰهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً',
    latin: "Allaahumma laa sahla illaa maa ja'altahu sahlan wa anta taj'alul-hazna idzaa syi'ta sahlan",
    translation: 'Ya Allah, tidak ada kemudahan kecuali apa yang Engkau jadikan mudah, dan Engkau menjadikan kesulitan itu mudah jika Engkau menghendaki.',
    category: 'Aktivitas'
  },
  {
    id: 398,
    title: 'Doa Memohon Kelapangan Rezeki yang Datang Tanpa Diduga-duga',
    arabic: 'رَبَّنَا أَنزِلْ عَلَيْنَا مَائِدَةً مِّنَ السَّمَاءِ تَكُونُ لَنَا عِيداً لِّأَوَّلِنَا وَآخِرِنَا',
    latin: "Rabbanaa anzil 'alaynaa maa'idatan minas-samaa'i takoounu lanaa 'iidan li'awwalinaa wa aakhirinaa",
    translation: 'Ya Tuhan kami, turunkanlah kepada kami hidangan dari langit, yang hari turunnya akan menjadi hari raya bagi kami, yaitu bagi orang-orang yang bersama kami dan yang datang sesudah kami.',
    category: 'Utama'
  },
  {
    id: 399,
    title: 'Doa Perlindungan dari Penyakit Pikun / Lemah Ingatan di Hari Tua',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ أَنْ أُرَدَّ إِلَىٰ أَرْذَلِ الْعُمُرِ',
    latin: "Allaahumma innii a'uudzu bika an uradda ilaa ardzalil-'umur",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari dikembalikan kepada usia yang paling hina (pikun).',
    category: 'Utama'
  },
  {
    id: 400,
    title: 'Doa Ketika Menyaksikan Gerhana Matahari / Bulan secara Langsung',
    arabic: 'اَللّٰهُمَّ اجْعَلْ هٰذَا الْخُسُوْفَ / الْكُسُوْفَ سَبَبًا لِلرَّحْمَةِ وَلَا تَجْعَلْهُ سَبَبًا لِلْعَذَابِ',
    latin: "Allaahummaj-'al haadzal-khusoofa / kusoofa sababan lir-rahmati wa laa taj-'alhu sababan lil-'adzaab",
    translation: 'Ya Allah, jadikanlah gerhana ini sebagai sebab turunnya rahmat dan janganlah Engkau jadikan ia sebagai sebab turunnya azab.',
    category: 'Alam'
  },
  {
    id: 401,
    title: 'Doa Memohon Diberikan Keberanian Menegakkan Keadilan',
    arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    latin: "Rabbanaa afrigh 'alaynaa sabran wa tsabbit aqdaamanaa wan-surnaa 'alal-qawmil-kaafiriin",
    translation: 'Ya Tuhan kami, limpahkanlah kesabaran kepada kami, kokohkanlah langkah-langkah kami, dan tolonglah kami menghadapi kaum yang kafir.',
    category: 'Utama'
  },
  {
    id: 402,
    title: 'Doa Ketika Hendak Memulai Musyawarah / Rapat Penting',
    arabic: 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
    latin: "Rabbanaa aatinaa min ladunka rahmatan wa hayyi' lanaa min amrinaa rasyadaa",
    translation: 'Ya Tuhan kami, berikanlah rahmat kepada kami dari sisi-Mu dan sempurnakanlah bagi kami petunjuk yang lurus dalam urusan kami.',
    category: 'Aktivitas'
  },
  {
    id: 403,
    title: 'Doa Saat Merasa Takut Terhadap Fitnah Akhir Zaman',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ فِتْنَةِ الْمَسِيْحِ الدَّجَّالِ',
    latin: "Allaahumma innii a'uudzu bika min fitnatil-mahyaa wal-mamaati wa min fitnatil-masiihid-dajjaal",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari fitnah kehidupan dan kematian, serta dari fitnah Al-Masih Ad-Dajjal.',
    category: 'Utama'
  },
  {
    id: 404,
    title: 'Doa Memohon Kelapangan Jiwa Saat Difitnah / Dituduh Palsu',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي',
    latin: "Rabbisy-rah lii shadrii wa yassir lii amrii wahlul 'uqdatan min lisaanii",
    translation: 'Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan lepaskanlah kekakuan dari lidahku.',
    category: 'Utama'
  },
  {
    id: 405,
    title: 'Doa Ketika Hendak Memotong Rambut Sunnah',
    arabic: 'اَللّٰهُمَّ اجْعَلْ لِكُلِّ شَعْرَةٍ نُوْرًا يَوْمَ الْقِيَامَةِ',
    latin: "Allaahummaj-'al likulli sya'ratin nooran yaumal-qiyaamah",
    translation: 'Ya Allah, jadikanlah setiap helai rambut ini sebagai cahaya bagi diriku pada hari kiamat kelak.',
    category: 'Harian'
  },
  {
    id: 406,
    title: 'Doa Saat Berada di Tengah Kebun / Melihat Pepohonan Rindang',
    arabic: 'مَا شَاءَ اللّٰهُ لَا قُوَّةَ إِلَّا بِاللّٰهِ، اَللّٰهُمَّ بَارِكْ لَنَا فِيْ ثَمَرِهِ',
    latin: "Maa syaa'allaahu laa quwwata illaa billaah, Allaahumma baarik lanaa fii tsamarih",
    translation: 'Semua ini atas kehendak Allah, tiada kekuatan melainkan dengan pertolongan Allah. Ya Allah, berkahilah kami pada buah-buahannya.',
    category: 'Alam'
  },
  {
    id: 407,
    title: 'Doa Ketika Selesai Mengaji Al-Qur\'an (Doa Khatam Singkat)',
    arabic: 'اَللّٰهُمَّ ارْحَمْنِيْ بِالْقُرْاٰنِ وَاجْعَلْهُ لِيْ إِمَامًا وَنُوْرًا وَهُدًى وَرَحْمَةً',
    latin: "Allaahummar-hamnii bil-qur'aani waj-'alhu lii imaaman wa nooran wa hudan wa rahmatan",
    translation: 'Ya Allah, sayangilah aku dengan Al-Qur\'an, jadikanlah ia bagiku sebagai pemimpin, cahaya, petunjuk, dan rahmat.',
    category: 'Ibadah'
  },
  {
    id: 408,
    title: 'Doa Perlindungan dari Sifat Gengsi dan Kesombongan Diri',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْكِبْرِ وَالْفَخْرِ وَالْخُيَلَاءِ',
    latin: "Allaahumma innii a'uudzu bika minal-kibri wal-fakhri wal-khuyalaa'",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari sifat sombong, berbangga diri, dan angkuh.',
    category: 'Utama'
  },
  {
    id: 409,
    title: 'Doa Ketika Melihat Keberhasilan Kawan / Sukses Sahabat',
    arabic: 'اَللّٰهُمَّ بَارِكْ لَهُ فِيْمَا رَزَقْتَهُ وَعَقِّبْهُ لَنَا بِالْخَيْرِ',
    latin: "Allaahumma baarik lahu fiimaa razaqtahu wa 'aqqibhu lanaa bil-khair",
    translation: 'Ya Allah, berkahilah dia pada apa yang telah Engkau rezekikan kepadanya, dan gantilah/berilah kebaikan serupa bagi kami.',
    category: 'Harian'
  },
  {
    id: 410,
    title: 'Doa Memohon Istiqamah dalam Menuntut Ilmu Agama',
    arabic: 'رَبِّ زِدْنِيْ عِلْمًا وَارْزُقْنِيْ فَهْمًا وَأَلْحِقْنِيْ بِالصَّالِحِيْنَ',
    latin: "Rabbi zi-dnii 'ilman warzuqnii fahman wa al-hiqnii bish-shaalihiin",
    translation: 'Ya Tuhanku, tambahkanlah ilmu kepadaku, karuniakanlah pemahaman kepadaku, dan gabungkanlah aku ke dalam golongan orang-orang sholeh.',
    category: 'Utama'
  },
  {
    id: 411,
    title: 'Doa Ketika Tiba di Rumah Setelah Safar / Perjalanan Jauh',
    arabic: 'تَوْبًا تَوْبًا، لِرَبِّنَا أَوْبًا، لَا يُغَادِرُ عَلَيْنَا حَوْبًا',
    latin: "Tauban taubaa, lirabbinaa aubaa, laa yughaadiru 'alaynaa haubaa",
    translation: 'Kami memohon ampun, kami kembali kepada Tuhan kami, semoga Dia tidak meninggalkan sisa dosa sedikit pun pada kami.',
    category: 'Harian'
  },
  {
    id: 412,
    title: 'Doa Saat Cuaca Mendung Sangat Tebal',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هٰذِهِ السَّحَابَةِ',
    latin: "Allaahumma innii a'uudzu bika min syarri maa fii haadzihis-sahaabah",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari keburukan apa yang ada di dalam awan mendung ini.',
    category: 'Alam'
  },
  {
    id: 413,
    title: 'Doa Memohon Diberikan Kedudukan yang Mulia dan Diberkahi',
    arabic: 'رَّبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا وَأَنتَ خَيْرُ الْمُنزِلِينَ',
    latin: "Rabbi anzilnii munzalan mubaarakan wa anta khairul-munziliin",
    translation: 'Ya Tuhanku, tempatkanlah aku pada tempat yang diberkahi, dan Engkau adalah sebaik-baik yang memberi tempat.',
    category: 'Utama'
  },
  {
    id: 414,
    title: 'Doa Ketika Melihat Sawah / Ladang yang Siap Panen',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ بَارَكَ لَنَا فِيْ زَرْعِنَا وَثَمَرِنَا وَأَخْرَجَ لَنَا رِزْقَنَا',
    latin: "Al-hamdu lillaahilladzii baaraka lanaa fii zar'inaa wa tsamarinaa wa akhraja lanaa rizqanaa",
    translation: 'Segala puji bagi Allah yang telah memberkahi tanaman dan buah-buahan kami serta mengeluarkan rezeki bagi kami.',
    category: 'Alam'
  },
  {
    id: 415,
    title: 'Doa Ketika Terhindar dari Kecelakaan Lalu Lintas',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ نَجَّانِيْ مِنَ الْهَلَكَةِ وَعَافَانِيْ بِرَحْمَتِهِ',
    latin: "Al-hamdu lillaahilladzii najjaanii minal-halakati wa 'aafinii birahmatika",
    translation: 'Segala puji bagi Allah yang telah menyelamatkan aku dari kebinasaan/kecelakaan dan menyehatkan aku dengan rahmat-Mu.',
    category: 'Harian'
  },
  {
    id: 416,
    title: 'Doa Memohon Perlindungan dari Hilangnya Nikmat Allah',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ وَتَحَوُّلِ عَافِيَتِكَ',
    latin: "Allaahumma innii a'uudzu bika min zawaali ni'matika wa tahawwuli 'aafiyatik",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari hilangnya nikmat-Mu dan berubahnya kesehatan/kesejahteraan yang Engkau berikan.',
    category: 'Utama'
  },
  {
    id: 417,
    title: 'Doa Ketika Memulai Pekerjaan Konstruksi / Membangun Rumah',
    arabic: 'رَبِّ ابْنِ لِيْ بَيْتًا مُبَارَكًا يَجْمَعُ شَمْلَنَا عَلَى الطَّاعَةِ',
    latin: "Rabbi-bni lii baitan mubaarakan yajma'u syamlanaa 'alath-thaa'ah",
    translation: 'Ya Tuhanku, bangunkanlah untukku bangunan/rumah yang diberkahi yang mengumpulkan kami di atas ketaatan kepada-Mu.',
    category: 'Aktivitas'
  },
  {
    id: 418,
    title: 'Doa Saat Menyambut Tamu di Rumah',
    arabic: 'مَرْحَبًا بِضُيُوْفِنَا، اَللّٰهُمَّ اجْعَلْ زِيَارَتَهُمْ بَرَكَةً وَخَيْرًا لَنَا',
    latin: "Marhaban bidhuyoofinaa, Allaahummaj-'al ziyaaratahum barakatan wa khayran lanaa",
    translation: 'Selamat datang para tamu kami. Ya Allah, jadikanlah kunjungan mereka membawa berkah dan kebaikan bagi kami.',
    category: 'Harian'
  },
  {
    id: 419,
    title: 'Doa Ketika Hendak Melakukan Sujud Syukur',
    arabic: 'سَجَدَ وَجْهِيَ لِلَّذِيْ خَلَقَهُ وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ',
    latin: "Sajada wajhiya lilladzii khalaqahu wa syaqqa sam'ahu wa basharahu bihauliihi wa quwwatih",
    translation: 'Wajahku bersujud kepada Zat yang menciptakannya, yang membelah pendengaran dan penglihatannya dengan daya dan kekuatan-Nya.',
    category: 'Ibadah'
  },
  {
    id: 420,
    title: 'Doa Saat Terjadi Kabut Tebal yang Menghalangi Pandangan',
    arabic: 'اَللّٰهُمَّ نَوِّرْ طَرِيْقَنَا وَاكْشِفْ عَنَّا هٰذَا الْغُمَّ وَالظُّلْمَةَ',
    latin: "Allaahumma nawwir thariiqanaa waksyif 'annaa haadzal-ghumma wadh-zhulmah",
    translation: 'Ya Allah, terangilah jalan kami dan singkapkanlah kabut serta kegelapan ini dari kami.',
    category: 'Alam'
  },
  {
    id: 421,
    title: 'Doa Ketika Hendak Memakai Pakaian Baru secara Sunnah',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ كَسَانِيْ هٰذَا الثَّوْبَ وَرَزَقَنِيْهِ مِنْ غَيْرِ حَوْلٍ مِنِّيْ وَلَا قُوَّةٍ',
    latin: "Al-hamdu lillaahilladzii kasaanii haadzats-tsauba wa razaqaniihi min ghayri haulin minnii wa laa quwwah",
    translation: 'Segala puji bagi Allah yang telah memakaikan pakaian ini kepadaku dan memberikan rezeki ini tanpa daya dan kekuatan dariku.',
    category: 'Harian'
  },
  {
    id: 422,
    title: 'Doa Saat Mendengar Berita Kematian Seseorang',
    arabic: 'إِنَّا لِلّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُوْنَ، اَللّٰهُمَّ أْجُرْنِيْ فِيْ مُصِيْبَتِيْ',
    latin: "Innaa lillaahi wa innaa ilaihi raaji'ooun, Allaahumma'-jurnii fii mushiibatii",
    translation: 'Sesungguhnya kami adalah milik Allah dan sesungguhnya hanya kepada-Nya kami akan kembali. Ya Allah, berilah pahala dalam musibahku ini.',
    category: 'Harian'
  },
  {
    id: 423,
    title: 'Doa Ketika Mengalami Rasa Sakit Kepala / Migrain',
    arabic: 'بِسْمِ اللّٰهِ (ثَلَاثًا)، أَعُوْذُ بِاللّٰهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ',
    latin: "Bismillaahi (3x), A'uudzu billaahi wa qudratihii min syarri maa ajidu wa uhaadzir (dibaca 7x)",
    translation: 'Dengan nama Allah (3x). Aku berlindung kepada Allah dan kekuasaan-Nya dari keburukan apa yang aku rasakan dan aku khawatirkan (7x).',
    category: 'Harian'
  },
  {
    id: 424,
    title: 'Doa Memohon Diberikan Teman Duduk yang Baik',
    arabic: 'اَللّٰهُمَّ ارْزُقْنِيْ جَلِيْسًا صَالِحًا يُذَكِّرُنِيْ بِكَ إِذَا نَسِيْتُ',
    latin: "Allaahummar-zuqnii jaliisan shalihaan yudzakkirunii bika idzaa nasiit",
    translation: 'Ya Allah, karuniakanlah kepadaku teman duduk yang sholeh yang mengingatkanku kepada-Mu jika aku lupa.',
    category: 'Utama'
  },
  {
    id: 425,
    title: 'Doa Ketika Memulai Belajar Membaca Al-Qur\'an (Doa Iqra)',
    arabic: 'رَبِّ يَسِّرْ وَلَا تُعَسِّرْ، رَبِّ اهْدِ قَلْبِيْ لِفَهْمِ كِتَابِكَ',
    latin: "Rabbi yassir wa laa tu'assir, Rabbi-hdi qalbii lifahmi kitaabik",
    translation: 'Ya Tuhanku, mudahkanlah dan jangan dipersulit. Ya Tuhanku, tunjukilah hatiku untuk memahami kitab-Mu.',
    category: 'Ibadah'
  },
  {
    id: 426,
    title: 'Doa Saat Terjadi Gerhana Bulan sunnah',
    arabic: 'سُبْحَانَ اللّٰهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ، اَللّٰهُمَّ اغْفِرْ لَنَا',
    latin: "Subhaanallaahi wal-hamdu lillaahi wa laa ilaaha illallaahu wallaahu Akbar, Allaahummag-fir lanaa",
    translation: 'Maha Suci Allah, segala puji bagi Allah, tiada Tuhan selain Allah, dan Allah Maha Besar. Ya Allah, ampunilah kami.',
    category: 'Ibadah'
  },
  {
    id: 427,
    title: 'Doa Ketika Melewati Tempat Pemakaman (Ziarah Kubur Singkat)',
    arabic: 'السَّلَامُ عَلَيْكُمْ دَارَ قَوْمٍ مُؤْمِنِينَ وَإِنَّا إِنْ شَاءَ اللّٰهُ بِكُمْ لَاحِقُونَ',
    latin: "As-salaamu 'alaykum daara qawmin mu'miniina wa innaa in syaa'allaahu bikum laahiquon",
    translation: 'Keselamatan atas kamu wahai hunian kaum yang beriman, dan sesungguhnya kami - dengan kehendak Allah - akan menyusul kalian.',
    category: 'Harian'
  },
  {
    id: 428,
    title: 'Doa Perlindungan dari Rekan Bisnis yang Berbuat Curang',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْخِيَانَةِ فِيْ عَهْدِى وَعَمَلِيْ',
    latin: "Allaahumma innii a'uudzu bika minal-khiyaanati fii 'ahdii wa 'amalii",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari pengkhianatan dalam kesepakatan dan pekerjaanku.',
    category: 'Utama'
  },
  {
    id: 429,
    title: 'Doa Ketika Melihat Indahnya Pelangi di Langit',
    arabic: 'سُبْحَانَ مَنْ خَلَقَ هٰذِهِ الْأَلْوَانَ جَمَالاً لِلنَّاظِرِيْنَ',
    latin: "Subhaana man khalaqa haadzihil-alwaana jamaalan lin-naazhiriin",
    translation: 'Maha Suci Zat yang menciptakan warna-warna indah ini sebagai keindahan bagi orang-orang yang memandangnya.',
    category: 'Alam'
  },
  {
    id: 430,
    title: 'Doa Saat Hendak Mengikuti Ujian Wawancara Kerja',
    arabic: 'اَللّٰهُمَّ اهْدِ قَلْبِيْ وَسَدِّدْ لِسَانِيْ وَأَلْقِ مَحَبَّتِيْ فِيْ قُلُوْبِهِمْ',
    latin: "Allaahummahdii qalbii wa saddid lisaanii wa alqi mahabbatii fii quluobihim",
    translation: 'Ya Allah, tunjukilah hatiku, tepatkanlah ucapanku, dan tanamkanlah rasa simpati/kasih sayang diriku di dalam hati mereka.',
    category: 'Aktivitas'
  },
  {
    id: 431,
    title: 'Doa Memohon Diberikan Umur Panjang yang Berkah dan Taat',
    arabic: 'اَللّٰهُمَّ طَوِّلْ عُمُرِيْ فِيْ طَاعَتِكَ وَأَحْسِنْ عَمَلِيْ وَاغْفِرْ ذَنْبِيْ',
    latin: "Allaahumma thawwil 'umurii fii thaa'atika wa ahsin 'amalii waghfir dzanbii",
    translation: 'Ya Allah, panjangkanlah umurku dalam ketaatan kepada-Mu, baguskanlah amalku, dan ampunilah dosa-dosaku.',
    category: 'Utama'
  },
  {
    id: 432,
    title: 'Doa Saat Hendak Menempati Kamar Kos / Kontrakan Baru',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ هٰذَا الْمَنْزِلِ وَأَعُوْذُ بِكَ مِنْ شَرِّهِ',
    latin: "Allaahumma innii as'aluka khaira haadzal-manzili wa a'uudzu bika min syarrih",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan rumah/kamar ini, dan aku berlindung kepada-Mu dari keburukannya.',
    category: 'Harian'
  },
  {
    id: 433,
    title: 'Doa Ketika Melihat Bintang Jatuh / Meteor',
    arabic: 'اَللّٰهُمَّ اجْعَلْهَا رَحْمَةً وَلَا تَجْعَلْهَا رَجْمًا لِلشَّيَاطِيْنِ فَقَطْ وَعَافِنَا',
    latin: "Allaahummaj-'alhaa rahmatan wa laa taj-'alhaa rajman lisy-syayaathiini faqat wa 'aafinaa",
    translation: 'Ya Allah, jadikanlah ia sebagai rahmat, dan janganlah Engkau jadikan ia semata-mata pelempar setan, serta selamatkanlah kami.',
    category: 'Alam'
  },
  {
    id: 434,
    title: 'Doa Ketika Hendak Mandi Sunnah Hari Raya Idul Adha',
    arabic: 'نَوَيْتُ الْغُسْلَ لِعِيْدِ الْأَضْحَى سُنَّةً لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla li-'iidil-adh-haa sunnatan lillaahi ta'aalaa",
    translation: 'Aku niat mandi sunnah untuk hari raya Idul Adha karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 435,
    title: 'Doa Saat Mengalami Demam Tinggi / Panas Tubuh',
    arabic: 'بِسْمِ اللّٰهِ الْكَبِيْرِ، أَعُوْذُ بِاللّٰهِ الْعَظِيْمِ مِنْ شَرِّ كُلِّ عِرْقٍ نَعَّارٍ',
    latin: "Bismillaahil-Kabiir, A'uudzu billaahil-'Azhiimi min syarri kulli 'irqin na'aarin (wa min syarri harrin-naar)",
    translation: 'Dengan nama Allah Yang Maha Besar. Aku berlindung kepada Allah Yang Maha Agung dari keburukan setiap urat yang memancar dan dari keburukan panas api neraka/demam.',
    category: 'Harian'
  },
  {
    id: 436,
    title: 'Doa Saat Berteduh di Bawah Pohon Ketika Hujan Lebat',
    arabic: 'اَللّٰهُمَّ سُقْيَا رَحْمَةٍ وَلَا سُقْيَا عَذَابٍ وَلَا هَدْمٍ وَلَا غَرَقٍ',
    latin: "Allaahumma suqyaa rahmatin wa laa suqyaa 'adzaabin wa laa hadmin wa laa gharaq",
    translation: 'Ya Allah, jadikanlah ia hujan rahmat, bukan hujan azab, bukan hujan yang merusak, dan bukan hujan yang menenggelamkan.',
    category: 'Alam'
  },
  {
    id: 437,
    title: 'Doa Ketika Menyaksikan Fajar Shadiq Mulai Menyingsing',
    arabic: 'اَللّٰهُمَّ اجْعَلْ فِجْرَنَا هٰذَا نُوْرًا وَبَرَكَةً وَفَتْحًا مُبِيْنًا',
    latin: "Allaahummaj-'al fijranaa haadzaa nooran wa barakatan wa fathan mubiinaa",
    translation: 'Ya Allah, jadikanlah fajar kami ini sebagai cahaya, keberkahan, dan kemenangan yang nyata.',
    category: 'Alam'
  },
  {
    id: 438,
    title: 'Doa Memohon Rahmat Serta Ampunan dari Allah',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    latin: "Rabbanaa zhalamnaa anfusanaa wa in lam taghfir lanaa wa tarhamnaa lanakoounanna minal-khaasiriin",
    translation: 'Ya Tuhan kami, kami telah mendzalimi diri kami sendiri. Jika Engkau tidak mengampuni kami dan memberi rahmat kepada kami, niscaya kami termasuk orang-orang yang rugi.',
    category: 'Utama'
  },
  {
    id: 439,
    title: 'Doa Ketika Melihat Bunga Mekar Indah di Kebun',
    arabic: 'سُبْحَانَ مَنْ أَخْرَجَ هٰذِهِ النَّضْرَةَ وَالْجَمَالَ رِزْقًا لِلْعِبَادِ',
    latin: "Subhaana man akhraja haadzihin-nadhraata wal-jamaala rizqan lil-'ibaad",
    translation: 'Maha Suci Zat yang mengeluarkan kesegaran dan keindahan ini sebagai rezeki bagi para hamba.',
    category: 'Alam'
  },
  {
    id: 440,
    title: 'Doa Ketika Hendak Mandi Sunnah Hari Raya Idul Fitri',
    arabic: 'نَوَيْتُ الْغُسْلَ لِعِيْدِ الْفِتْرِ سُنَّةً لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla li-'iidil-fitri sunnatan lillaahi ta'aalaa",
    translation: 'Aku niat mandi sunnah untuk hari raya Idul Fitri karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 441,
    title: 'Doa Ketika Terhindar dari Rayuan / Godaan Kemaksiatan',
    arabic: 'مَعَاذَ اللّٰهِ، إِنَّهُ رَبِّيْ أَحْسَنَ مَثْوَايَ، إِنَّهُ لَا يُفْلِحُ الظَّالِمُوْنَ',
    latin: "Ma'aadza-llaahi, innahu rabbii ahsana matswaaya, innahu laa yuflihuz-zhaalimooun",
    translation: 'Aku berlindung kepada Allah, sungguh Dia Tuhanku yang telah memperlakukan aku dengan baik. Sesungguhnya orang-orang yang dzalim itu tidak akan beruntung.',
    category: 'Utama'
  },
  {
    id: 442,
    title: 'Doa Ketika Menghadapi Deadline Pekerjaan yang Sangat Mepet',
    arabic: 'اَللّٰهُمَّ بَارِكْ لَنَا فِيْ أَوْقَاتِنَا وَأَنْجِزْ لَنَا أَعْمَالَنَا بِسُهُوْلَةٍ',
    latin: "Allaahumma baarik lanaa fii auqaatinaa wa anjiz lanaa a'maalanaa bisuhoolah",
    translation: 'Ya Allah, berkahilah kami pada waktu-waktu kami, dan selesaikanlah pekerjaan-pekerjaan kami dengan kemudahan.',
    category: 'Aktivitas'
  },
  {
    id: 443,
    title: 'Doa Ketika Mendengar Suara Burung Hantu / Binatang di Malam Hari',
    arabic: 'أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ، اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ فَضْلِكَ',
    latin: "A'uudzu billaahi minasy-syaithaanir-rajiim, Allaahumma innii as'aluka min fadhlika",
    translation: 'Aku berlindung kepada Allah dari setan yang terkutuk. Ya Allah, sesungguhnya aku memohon kepada-Mu dari karunia-Mu.',
    category: 'Harian'
  },
  {
    id: 444,
    title: 'Doa Perlindungan dari Rekan yang Bermuka Dua (Munafik) di Tempat Kerja',
    arabic: 'اَللّٰهُمَّ أَخْرِجْنِيْ مِنْ بَيْنِهِمْ سَالِمًا وَاكْفِنِيْ شَرَّ ذِيْ الْوَجْهَيْنِ',
    latin: "Allaahumma akhrijnii min bainihim saaliman wak-finii syarra dziil-wajhain",
    translation: 'Ya Allah, keluarkanlah aku dari lingkungan mereka dengan selamat, dan cukupkanlah aku dari keburukan orang yang bermuka dua.',
    category: 'Utama'
  },
  {
    id: 445,
    title: 'Doa Saat Menikmati Makanan Tradisional / Hidangan Nikmat',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَطْعَمَنَا طَيِّبًا وَسَقَانَا هَنِيْئًا مُبَارَكًا',
    latin: "Al-hamdu lillaahilladzii ath'amanaa thayyiban wa saqaanaa hanii'an mubaarakan",
    translation: 'Segala puji bagi Allah yang telah memberi kami makanan yang baik serta memberi kami minuman yang segar lagi diberkahi.',
    category: 'Harian'
  },
  {
    id: 446,
    title: 'Doa Saat Melihat Aliran Sungai yang Tenang dan Bersih',
    arabic: 'اَللّٰهُمَّ اجْعَلْ حَيَاتَنَا جَارِيَةً بِالْخَيْرِ كَمَا تَجْرِيْ هٰذِهِ الْمِيَاهُ',
    latin: "Allaahummaj-'al hayaatanaa jaariyatan bil-khayri kamaa tajrii haadzihil-miyaah",
    translation: 'Ya Allah, jadikanlah kehidupan kami mengalir dengan kebaikan sebagaimana air ini mengalir.',
    category: 'Alam'
  },
  {
    id: 447,
    title: 'Doa Saat Terjadi Kabut Pagi Hari yang Dingin',
    arabic: 'اَللّٰهُمَّ بَارِكْ لَنَا فِيْ هٰذَا الصَّبَاحِ وَعَافِنَا مِنَ الْبَرْدِ الشَّدِيْدِ',
    latin: "Allaahumma baarik lanaa fii haadzash-shabaahi wa 'aafinaa minal-bardisy-syadiid",
    translation: 'Ya Allah, berkahilah kami di pagi hari ini, dan sehatkanlah kami dari udara dingin yang sangat ekstrem.',
    category: 'Alam'
  },
  {
    id: 448,
    title: 'Doa Memohon Keteguhan Hati Menghadapi Cobaan Hidup',
    arabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ وَطَاعَتِكَ',
    latin: "Yaa muqallibal-quluobi tsabbit qalbii 'alaa diinika wa thaa'atik",
    translation: 'Ya Zat yang membolak-balikkan hati, kokohkanlah hatiku di atas agama-Mu dan ketaatan kepada-Mu.',
    category: 'Utama'
  },
  {
    id: 449,
    title: 'Doa Saat Mendengar Suara Ayam Berkokok di Pagi Hari',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيْمِ وَجَنَّتِكَ',
    latin: "Allaahumma innii as'aluka min fadhlikal-'azhiimi wa jannatik",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu dari karunia-Mu Yang Maha Agung dan surga-Mu. (Karena ayam berkokok saat melihat malaikat).',
    category: 'Alam'
  },
  {
    id: 450,
    title: 'Doa Ketika Hendak Membaca Sholawat Nabi',
    arabic: 'اَللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    latin: "Allaahumma shalli 'alaa Muhammadin wa 'alaa aali Muhammad",
    translation: 'Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan kepada keluarga Nabi Muhammad.',
    category: 'Ibadah'
  },
  {
    id: 451,
    title: 'Doa Saat Hendak Mandi Sunnah Hari Arafah',
    arabic: 'نَوَيْتُ الْغُسْلَ لِيَوْمِ عَرَفَةَ سُنَّةً لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla liyaumi 'arafata sunnatan lillaahi ta'aalaa",
    translation: 'Aku niat mandi sunnah untuk hari Arafah karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 452,
    title: 'Doa Ketika Mengagumi Keindahan Bintang-Bintang di Langit Malam',
    arabic: 'رَبَّنَا مَا خَلَقْتَ هٰذَا بَاطِلاً سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ',
    latin: "Rabbanaa maa khalaqta haadzaa baatilaa subhaanaka faqinaa 'adzaaban-naar",
    translation: 'Ya Tuhan kami, tidaklah Engkau menciptakan semua ini sia-sia. Maha Suci Engkau, maka lindungilah kami dari azab neraka.',
    category: 'Alam'
  },
  {
    id: 453,
    title: 'Doa Memohon Kelapangan Rezeki untuk Keluarga Besar',
    arabic: 'اَللّٰهُمَّ اكْفِنَا بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِيْ بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    latin: "Allaahummak-finaa bihalaalika 'an haraamika wa aghninii bifadhlika 'amman siwaak",
    translation: 'Ya Allah, cukupkanlah kami dengan yang halal dari yang haram-Mu, dan cukupkanlah kami dengan karunia-Mu dari selain-Mu.',
    category: 'Keluarga'
  },
  {
    id: 454,
    title: 'Doa Ketika Mendapatkan Kabar Gembira / Kelahiran Anak',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ وَبَارَكَ اللّٰهُ لَكَ',
    latin: "Al-hamdu lillaahilladzii bini'matihii tatimmush-shaalihaatu wa baarakallaahu lak",
    translation: 'Segala puji bagi Allah yang dengan nikmat-Nya kebaikan menjadi sempurna, dan semoga Allah memberkahimu.',
    category: 'Keluarga'
  },
  {
    id: 455,
    title: 'Doa Ketika Terhindar dari Penipuan / Transaksi Palsu',
    arabic: 'اَللّٰهُمَّ اكْفِنِيْ كَيْدَ الْخَائِنِيْنَ وَأَعِذْنِيْ مِنْ شَرِّ الْمُعَامَلَاتِ',
    latin: "Allaahummak-finii kaydal-khaa'iniina wa a'idznii min syarril-mu'aamalaat",
    translation: 'Ya Allah, cukupkanlah aku dari tipu daya orang-orang yang berkhianat, dan lindungilah aku dari keburukan transaksi yang merugikan.',
    category: 'Aktivitas'
  },
  {
    id: 456,
    title: 'Doa Saat Hendak Menghadiri Majelis Ilmu / Kajian Keagamaan',
    arabic: 'اَللّٰهُمَّ انْفَعْنِيْ بِمَا عَلَّمْتَنِيْ وَعَلِّمْنِيْ مَا يَنْفَعُنِيْ وَزِدْنِيْ عِلْمًا',
    latin: "Allaahumman-fa'nii bimaa 'allamtanii wa 'allimnii maa yanfa'unii wa zidnii 'ilmaa",
    translation: 'Ya Allah, berilah manfaat atas apa yang Engkau ajarkan kepadaku, ajarkanlah kepadaku apa yang bermanfaat bagiku, dan tambahkanlah ilmu kepadaku.',
    category: 'Ibadah'
  },
  {
    id: 457,
    title: 'Doa Saat Terjadi Angin Sepoi-sepoi yang Menyegarkan',
    arabic: 'اَللّٰهُمَّ اجْعَلْهَا رِيَاحًا طَيِّبَةً مُبَارَكَةً وَلَا تَجْعَلْهَا رِيْحًا عَقِيْمًا',
    latin: "Allaahummaj-'alhaa riyaahan thayyibatan mubaarakan wa laa taj-'alhaa riihan 'aqiimaa",
    translation: 'Ya Allah, jadikanlah angin ini angin sepoi-sepoi yang membawa rahmat lagi berkah, dan janganlah Engkau jadikan ia angin puting beliung/bencana.',
    category: 'Alam'
  },
  {
    id: 458,
    title: 'Doa Memohon Ampunan Dasa Masa Lalu dan Masa Depan',
    arabic: 'اَللّٰهُمَّ اغْفِرْ لِيْ ذَنْبِيْ كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ',
    latin: "Allaahummagh-fir lii dzanbii kullahu diqqahu wa jillahu wa awwalahu wa aakhirah",
    translation: 'Ya Allah, ampunilah seluruh dosaku, yang kecil maupun yang besar, yang awal maupun yang akhir.',
    category: 'Utama'
  },
  {
    id: 459,
    title: 'Doa Saat Hendak Memulai Pekerjaan Kreatif / Menulis / Seni',
    arabic: 'اَللّٰهُمَّ أَلْهِمْنِيْ رُشْدِيْ وَأَبْدِعْ لِيْ فِيْ عَمَلِيْ وَفِكْرِيْ',
    latin: "Allaahumma alhimnii rusydii wa abdi' lii fii 'amalii wa fikrii",
    translation: 'Ya Allah, ilhamkanlah petunjuk kepadaku, dan berikanlah kreativitas/keindahan dalam pekerjaan dan pikiranku.',
    category: 'Aktivitas'
  },
  {
    id: 460,
    title: 'Doa Saat Berada di Lingkungan Kos Baru (Mohon Teman Kos yang Baik)',
    arabic: 'اَللّٰهُمَّ أَعِذْنِيْ مِنْ شَرِّ خَلْقِكَ وَمِنْ صَاحِبٍ خَدُوْعٍ فِيْ جِوَارِيْ',
    latin: "Allaahumma a'idznii min syarri khalqika wa min shaahibin khadoo'in fii jiwaarii",
    translation: 'Ya Allah, lindungilah aku dari keburukan makhluk-Mu dan dari rekan tetangga kos yang menipu.',
    category: 'Harian'
  },
  {
    id: 461,
    title: 'Doa Saat Menyaksikan Keindahan Ombak Lautan yang Luas',
    arabic: 'سُبْحَانَ مَنْ سَخَّرَ الْبَحْرَ لِتَجْرِيَ الْفُلْكُ فِيْهِ بِأَمْرِهِ',
    latin: "Subhaana man sakhkharal-bahra litajriyal-fulku fiihi bi-amrih",
    translation: 'Maha Suci Zat yang menundukkan lautan agar kapal-kapal dapat berlayar di atasnya dengan perintah-Nya.',
    category: 'Alam'
  },
  {
    id: 462,
    title: 'Doa Ketika Selesai Menguras / Membersihkan Sumur atau Tandon Air',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ جَعَلَ الْمَاءَ طَهُوْرًا وَنَقِيًّا مُبَارَكًا',
    latin: "Al-hamdu lillaahilladzii ja'alal-maaa'a thahooraan wa naqiyyaan mubaarakan",
    translation: 'Segala puji bagi Allah yang telah menjadikan air ini suci mensucikan, bersih, lagi diberkahi.',
    category: 'Harian'
  },
  {
    id: 463,
    title: 'Doa Saat Hendak Membeli Pakaian / Perlengkapan Sekolah',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا هُوَ لَهُ',
    latin: "Allaahumma innii as'aluka min khairihii wa khaira maa huwa lah",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikannya dan kebaikan tujuan ia dibuat.',
    category: 'Harian'
  },
  {
    id: 464,
    title: 'Doa Ketika Hendak Membayar Zakat Fitrah',
    arabic: 'اَللّٰهُمَّ اجْعَلْهَا مَغْنَمًا وَلَا تَجْعَلْهَا مَغْرَمًا وَتَقَبَّلْ مِنَّا',
    latin: "Allaahummaj-'alhaa maghnaman wa laa taj-'alhaa maghraman wa taqabbal minnaa",
    translation: 'Ya Allah, jadikanlah zakat ini sebagai keberuntungan/pembersih harta dan jangan jadikan ia sebagai denda/beban yang memberatkan, serta terimalah dari kami.',
    category: 'Ibadah'
  },
  {
    id: 465,
    title: 'Doa Saat Berada di Atas Jembatan yang Tinggi / Menyeberangi Sungai',
    arabic: 'رَبَّنَا نَجِّنَا وَأَعِنَّا عَلَى الْعُبُوْرِ بِسَلَامَةٍ وَتَوْفِيْقٍ',
    latin: "Rabbanaa najjinaa wa a'innaa 'alal-uboorbi salaamatin wa taufiiq",
    translation: 'Ya Tuhan kami, selamatkanlah kami dan bantulah kami untuk menyeberang dengan selamat serta mendapat taufik.',
    category: 'Aktivitas'
  },
  {
    id: 466,
    title: 'Doa Ketika Terhindar dari Kecurian / Perampokan di Jalan',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ حَفِظَنِيْ وَحَفِظَ مَالِيْ بِقُدْرَتِهِ',
    latin: "Al-hamdu lillaahilladzii hafizhanii wa hafizha maalii biqudratih",
    translation: 'Segala puji bagi Allah yang telah menjaga diriku dan menjaga hartaku dengan kekuasaan-Nya.',
    category: 'Harian'
  },
  {
    id: 467,
    title: 'Doa Memohon Rasa Malu untuk Melakukan Pelanggaran Syariat',
    arabic: 'اَللّٰهُمَّ ارْزُقْنِيْ حَيَاءً يَمْنَعُنِيْ عَنِ الْمَعَاصِيْ وَزَيِّنْ قَلْبِيْ بِالتَّقْوَى',
    latin: "Allaahummar-zuqnii hayaa'an yamna'unii 'anil-ma'aashii wa zayyin qalbii bit-taqwaa",
    translation: 'Ya Allah, karuniakanlah kepadaku rasa malu yang menghalangiku dari berbuat maksiat, dan hiasilah hatiku dengan ketakwaan.',
    category: 'Utama'
  },
  {
    id: 468,
    title: 'Doa Saat Mengalami Kesedihan karena Kehilangan Orang Tercinta',
    arabic: 'إِنَّا لِلّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُوْنَ، اَللّٰهُمَّ أَخْلِفْ لِيْ فِيْ أَهْلِيْ بِخَيْرٍ',
    latin: "Innaa lillaahi wa innaa ilaihi raaji'ooun, Allaahumma akhlif lii fii ahlii bikhair",
    translation: 'Sesungguhnya kami adalah milik Allah dan sesungguhnya hanya kepada-Nya kami kembali. Ya Allah, berilah ganti kebaikan bagi keluargaku.',
    category: 'Harian'
  },
  {
    id: 469,
    title: 'Doa Ketika Hendak Mandi Sunnah Masuk Kota Madinah Munawwarah',
    arabic: 'اَللّٰهُمَّ هٰذَا حَرَمُ رَسُوْلِكَ فَاجْعَلْهُ لِيْ وِقَايَةً مِنَ النَّارِ',
    latin: "Allaahumma haadzaa haramu Rasuolika faj-'alhu lii wiqaayatan minan-naar",
    translation: 'Ya Allah, tempat ini adalah tanah suci Rasul-Mu, maka jadikanlah ia sebagai pelindung bagiku dari siksa api neraka.',
    category: 'Ibadah'
  },
  {
    id: 470,
    title: 'Doa Saat Berolahraga / Melatih Fisik Agar Diberi Kekuatan',
    arabic: 'اَللّٰهُمَّ قَوِّ أَبْدَانَنَا عَلَى طَاعَتِكَ وَأَعِنَّا عَلَى خِدْمَةِ خَلْقِكَ',
    latin: "Allaahumma qawwi abdaananaa 'alaa thaa'atika wa a'innaa 'alaa khidmati khalqik",
    translation: 'Ya Allah, kuatkanlah badan kami untuk taat kepada-Mu dan bantulah kami untuk melayani makhluk-Mu.',
    category: 'Harian'
  },
  {
    id: 471,
    title: 'Doa Perlindungan dari Gangguan Jin Saat Membuka Lemari Pakaian',
    arabic: 'بِسْمِ اللّٰهِ الَّذِيْ لَا إِلٰهَ إِلَّا هُوَ وَأَعُوْذُ بِهِ مِنَ الْخَبَائِثِ',
    latin: "Bismillaahilladzii laa ilaaha illaa Huwa wa a'uudzu bihi minal-khabaa'its",
    translation: 'Dengan nama Allah yang tiada Tuhan selain Dia, dan aku berlindung kepada-Nya dari gangguan jin jahat.',
    category: 'Harian'
  },
  {
    id: 472,
    title: 'Doa Saat Hendak Mandi Sunnah Hari Raya Idul Adha bagi Musafir',
    arabic: 'نَوَيْتُ الْغُسْلَ لِعِيْدِ الْأَضْحَى سُنَّةً لِلّٰهِ تَعَالَى فِيْ سَفَرِيْ',
    latin: "Nawaitul-ghusla li-'iidil-adh-haa sunnatan lillaahi ta'aalaa fii safarij",
    translation: 'Aku niat mandi sunnah untuk hari raya Idul Adha karena Allah Ta\'ala dalam perjalananku.',
    category: 'Ibadah'
  },
  {
    id: 473,
    title: 'Doa Ketika Hendak Mandi Sunnah Sholat Istisqa (Mohon Hujan)',
    arabic: 'نَوَيْتُ الْغُسْلَ لِصَلَاةِ الْاِسْتِسْقَاءِ سُنَّةً لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla lishalaatil-istisqaaa'i sunnatan lillaahi ta'aalaa",
    translation: 'Aku niat mandi sunnah untuk sholat memohon hujan karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 474,
    title: 'Doa Ketika Menyaksikan Matahari Terbit di Ufuk Timur',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَقَالَنَا يَوْمَنَا هٰذَا وَلَمْ يُهْلِكْنَا بِذُنُوْبِنَا',
    latin: "Al-hamdu lillaahilladzii aqaalanaa yaumanaa haadzaa wa lem yuhliknaa bidzunuobinaa",
    translation: 'Segala puji bagi Allah yang telah memaafkan/menghidupkan kami di hari ini dan tidak membinasakan kami karena dosa-dosa kami.',
    category: 'Alam'
  },
  {
    id: 475,
    title: 'Doa Ketika Menyaksikan Matahari Terbenam di Ufuk Barat',
    arabic: 'اَللّٰهُمَّ هٰذَا إِقْبَالُ لَيْلِكَ وَإِدْبَارُ نَهَارِكَ فَاغْفِرْ لِيْ',
    latin: "Allaahumma haadzaa iqbaalu laylika wa idbaaru nahaarika faghfir lii",
    translation: 'Ya Allah, ini adalah tibanya malam-Mu dan berlalunya siang-Mu, maka ampunilah dosa-dosaku.',
    category: 'Alam'
  },
  {
    id: 476,
    title: 'Doa Memohon Diberikan Sifat Pemaaf kepada Orang yang Dzalim',
    arabic: 'اَللّٰهُمَّ اعْفُ عَمَّنْ ظَلَمَنِيْ وَأَصْلِحْ بَيْنَنَا بِالْخَيْرِ وَالْمَوَدَّةِ',
    latin: "Allaahumma'-fu 'amman zhamanii wa ashlih bainanaa bil-khairi wal-mawaddah",
    translation: 'Ya Allah, maafkanlah orang yang telah mendzalimiku, dan perbaikilah hubungan di antara kami dengan kebaikan dan kasih sayang.',
    category: 'Utama'
  },
  {
    id: 477,
    title: 'Doa Ketika Hendak Memasak Sayuran / Makanan Bergizi',
    arabic: 'اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَاجْعَلْهُ غِذَاءً صَالِحًا لِأَجْسَادِنَا',
    latin: "Allaahumma baarik lanaa fiimaa razaqtanaa waj-'alhu ghidzaa'an shalihaan li-ajsaadinaa",
    translation: 'Ya Allah, berkahilah rezeki yang Engkau berikan kepada kami, dan jadikanlah makanan ini nutrisi yang baik bagi tubuh kami.',
    category: 'Harian'
  },
  {
    id: 478,
    title: 'Doa Ketika Hendak Memotong Kuku Kaki pada Hari Jumat',
    arabic: 'بِسْمِ اللّٰهِ وَعَلَىٰ سُنَّةِ رَسُوْلِ اللّٰهِ صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ',
    latin: "Bismillaahi wa 'alaa sunnati Rasuolillaahi shallallaahu 'alayhi wa sallam",
    translation: 'Dengan nama Allah, dan di atas tuntunan sunnah Rasulullah Shallallahu Alaihi Wasallam.',
    category: 'Harian'
  },
  {
    id: 479,
    title: 'Doa Ketika Menginginkan Keberkahan dalam Hubungan Suami Istri',
    arabic: 'اَللّٰهُمَّ بَارِكْ لَنَا فِيْ أَهْلِنَا وَبَارِكْ لَهُمْ فِيْنَا وَارْقُنَا مِنْهُمْ',
    latin: "Allaahumma baarik lanaa fii ahlinaa wa baarik lahum fiinaa war-zuqnaa minhum",
    translation: 'Ya Allah, berkahilah pasangan kami untuk kami, berkahilah diri kami untuk mereka, dan berilah kami keturunan sholeh dari mereka.',
    category: 'Keluarga'
  },
  {
    id: 480,
    title: 'Doa Saat Hendak Mandi Wiladah setelah Masa Nifas Selesai',
    arabic: 'نَوَيْتُ الْغُسْلَ لِرَفْعِ حَدَثِ النِّفاَسِ فَرْضًا لِلّٰهِ تَعَالَى',
    latin: "Nawaitul-ghusla liraf'i hadatsin-nifaasi fardhaan lillaahi ta'aalaa",
    translation: 'Aku niat mandi wajib untuk mensucikan diri dari hadats nifas, fardhu karena Allah Ta\'ala.',
    category: 'Ibadah'
  },
  {
    id: 481,
    title: 'Doa Ketika Berada di Tengah Padang Pasir / Hamparan Luas',
    arabic: 'سُبْحَانَ مَنْ خَلَقَ الْأَرْضَ وَجَعَلَ فِيْهَا سُبُلًا لِنَهْتَدِيَ',
    latin: "Subhaana man khalaqal-ardha wa ja'ala fiihaa subulaan linahtadiya",
    translation: 'Maha Suci Zat yang menciptakan bumi dan menjadikan jalan-jalan di dalamnya agar kami mendapat petunjuk arah.',
    category: 'Alam'
  },
  {
    id: 482,
    title: 'Doa Ketika Hendak Memasang Hiasan Dinding / Kaligrafi',
    arabic: 'اَللّٰهُمَّ زَيِّنْ بُيُوْتَنَا بِذِكْرِكَ وَطَاعَتِكَ وَاجْعَلْهَا عَامِرَةً بِالْخَيْرِ',
    latin: "Allaahumma zayyin buyuutanaa bidzikrika wa thaa'atika waj-'alhaa 'aamiratan bil-khair",
    translation: 'Ya Allah, hiasilah rumah-rumah kami dengan berdzikir kepada-Mu dan ketaatan kepada-Mu, serta jadikanlah ia makmur dengan kebaikan.',
    category: 'Harian'
  },
  {
    id: 483,
    title: 'Doa Saat Hendak Melunasi Hutang Kawan / Rekan',
    arabic: 'اَللّٰهُمَّ تَقَبَّلْ مِنَّا وَأَعِنَّا عَلَى أَدَاءِ الْأَمَانَاتِ إِلَى أَهْلِهَا',
    latin: "Allaahumma taqabbal minnaa wa a'innaa 'alaa adaaa'il-amaanati ilaa ahlihaa",
    translation: 'Ya Allah, terimalah amal kami dan bantulah kami untuk menunaikan amanah kepada orang yang berhak menerimanya.',
    category: 'Aktivitas'
  },
  {
    id: 484,
    title: 'Doa Ketika Berada di Tengah Kepulan Asap Tebal / Kebakaran Hutan',
    arabic: 'اَللّٰهُمَّ نَجِّنَا مِنَ الْخَنَقِ وَالْحَرِيْقِ وَاحْفَظْ صِحَّتَنَا بِرَحْمَتِكَ',
    latin: "Allaahumma najjinaa minal-khanaqi wal-hariiqi wah-fazh sihhatanaa birahmatika",
    translation: 'Ya Allah, selamatkanlah kami dari sesak napas dan kobaran api, serta jagalah kesehatan kami dengan rahmat-Mu.',
    category: 'Alam'
  },
  {
    id: 485,
    title: 'Doa Saat Mengalami Susah Tidur / Insomnia yang Parah',
    arabic: 'اَللّٰهُمَّ غَارَتِ النُّجُوْمُ وَهَدَأَتِ الْعُيُوْنُ وَأَنْتَ حَيُّ قَيُّوْمٌ أَنِمْ عَيْنِيْ',
    latin: "Allaahumma ghaaratin-nujoomu wa hada'atil-'uyoounu wa anta Hayyun Qayyooum anim 'ainiy",
    translation: 'Ya Allah, bintang-bintang telah tenggelam, mata-mata telah terpejam, dan Engkau Maha Hidup lagi terus-menerus mengurus makhluk-Mu, maka pejamkanlah mataku.',
    category: 'Harian'
  },
  {
    id: 486,
    title: 'Doa Perlindungan dari Bisikan Jahat dalam Hati (Waswas)',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِيْنِ وَأَعُوْذُ بِكَ أَنْ يَحْضُرُوْنِ',
    latin: "Allaahumma innii a'uudzu bika min hamazaatisy-syayaathiini wa a'uudzu bika ay yahdhuroon",
    translation: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari bisikan-bisikan setan, dan aku berlindung kepada-Mu dari kedatangan mereka kepadaku.',
    category: 'Utama'
  },
  {
    id: 487,
    title: 'Doa Ketika Menghadapi Guru / Dosen yang Terkenal Killer',
    arabic: 'اَللّٰهُمَّ أَلْقِ فِيْ قَلْبِهِ الرَّحْمَةَ وَالسُّهُوْلَةَ وَاجْعَلْ صَدْرَهُ رَحِيْبًا لِيْ',
    latin: "Allaahumma alqi fii qalbihi-rahmata was-suhoolata waj-'al sadrahu rahiibaan lii",
    translation: 'Ya Allah, tanamkanlah rasa kasih sayang dan kemudahan di hatinya, serta jadikanlah dadanya lapang untuk membimbingku.',
    category: 'Aktivitas'
  },
  {
    id: 488,
    title: 'Doa Ketika Terhindar dari Bahaya Riba dan Transaksi Haram',
    arabic: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ عَاَفانِيْ مِنَ الرِّبَا وَأَغْنَنِيْ بِالْحَلَالِ الطَّيِّبِ',
    latin: "Al-hamdu lillaahilladzii 'aafaanii minal-ribaa wa aghnanii bil-halaalit-thayyib",
    translation: 'Segala puji bagi Allah yang telah menyelamatkan aku dari bahaya riba dan mencukupkan aku dengan rezeki yang halal lagi baik.',
    category: 'Utama'
  },
  {
    id: 489,
    title: 'Doa Membeli Perlengkapan / Alat Kerja Baru',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ هٰذِهِ الْاٰلَةِ وَخَيْرَ مَا صُنِعَتْ لَهُ',
    latin: "Allaahumma innii as'aluka khaira haadzihil-aalati wa khaira maa shuni'at lah",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan alat kerja ini dan kebaikan tujuan ia diciptakan.',
    category: 'Aktivitas'
  },
  {
    id: 490,
    title: 'Doa Saat Berada di Taman Bunga / Tempat Wisata Alam',
    arabic: 'اَللّٰهُمَّ كَمَا حَسَّنْتَ خَلْقَ هٰذِهِ الْأَزْهَارِ فَحَسِّنْ خُلُقِيْ وَأَبْهِجْ قَلْبِيْ',
    latin: "Allaahumma kamaa hassanta khalqa haadzihil-azhaari fa-hassin khuluqii wa abhij qalbii",
    translation: 'Ya Allah, sebagaimana Engkau telah memperindah ciptaan bunga-bunga ini, maka indahkanlah akhlakku dan gembirakanlah hatiku.',
    category: 'Alam'
  },
  {
    id: 491,
    title: 'Doa Ketika Hendak Menulis Surat / Dokumen Resmi Penting',
    arabic: 'اَللّٰهُمَّ اهْدِ قَلَمِيْ وَاجْعَلْ كَلَامِيْ سَدِيْدًا مُبَارَكًا',
    latin: "Allaahummahdii qalamii waj-'al kalaamii sadiidaan mubaarakan",
    translation: 'Ya Allah, tunjukilah penaku (tulisanku) dan jadikanlah perkataanku tepat lagi diberkahi.',
    category: 'Aktivitas'
  },
  {
    id: 492,
    title: 'Doa Saat Mendengar Kucing Mengeong Kelaparan',
    arabic: 'اَللّٰهُمَّ ارْحَمْ كُلَّ ذِيْ رُوْحٍ رَطْبَةٍ وَأَعِنَّا عَلَى الْإِحْسَانِ إِلَيْهَا',
    latin: "Allaahummar-ham kulla dzii roohin rathbatin wa a'innaa 'alal-ihsaani ilaihaa",
    translation: 'Ya Allah, sayangilah setiap makhluk yang bernyawa dan berilah kami kemampuan untuk berbuat baik kepadanya.',
    category: 'Harian'
  },
  {
    id: 493,
    title: 'Doa Ketika Berada di Lingkungan Kampus / Sekolah Baru',
    arabic: 'اَللّٰهُمَّ اجْعَلْ حَيَاتِيْ الْأَكَادِيْمِيَّةَ مُبَارَكَةً وَارْزُقْنِيْ نَجَاحًا بَاهِرًا',
    latin: "Allaahummaj-'al hayaatiyal-akaadiimiyyata mubaarakan warzuqnii najaahaan baahiraan",
    translation: 'Ya Allah, jadikanlah kehidupan akademisku penuh berkah dan karuniakanlah kepadaku kesuksesan yang gemilang.',
    category: 'Aktivitas'
  },
  {
    id: 494,
    title: 'Doa Ketika Terhindar dari Fitnah Media Sosial / Hoax',
    arabic: 'اَللّٰهُمَّ أَرِنَا الْحَقَّ حَقًّا وَاجْنِبْنَا الْقَوْلَ الزُّوْرَ وَالْفِتَنَ',
    latin: "Allaahumma arinal-haqqa haqqan wajnibnaal-qaulaz-zoora wal-fitan",
    translation: 'Ya Allah, tunjukkanlah kepada kami yang benar itu benar, dan jauhkanlah kami dari perkataan dusta serta fitnah.',
    category: 'Utama'
  },
  {
    id: 495,
    title: 'Doa Saat Menikmati Pemandangan Lembah Hijau yang Indah',
    arabic: 'سُبْحَانَ مَنْ زَيَّنَ الْأَرْضَ بِالْحَيَاةِ وَالْأَشْجَارِ جَمَالاً لَنَا',
    latin: "Subhaana man zayyanal-ardha bil-hayaati wal-asjyaari jamaalaan lanaa",
    translation: 'Maha Suci Zat yang menghias bumi dengan kehidupan dan pepohonan sebagai keindahan bagi kami.',
    category: 'Alam'
  },
  {
    id: 496,
    title: 'Doa Ketika Hendak Memulai Latihan Membaca Seni Al-Qur\'an (Mujawwad)',
    arabic: 'اَللّٰهُمَّ زَيِّنْ أَصْوَاتَنَا بِالْقُرْآنِ وَاجْعَلْهُ رَبِيْعَ قُلُوْبِنَا',
    latin: "Allaahumma zayyin ashwaatanaa bil-qur'aani waj-'alhu rabii'a quluobinaa",
    translation: 'Ya Allah, indahkanlah suara kami dengan membaca Al-Qur\'an, dan jadikanlah ia sebagai penyejuk hati kami.',
    category: 'Ibadah'
  },
  {
    id: 497,
    title: 'Doa Perlindungan dari Rekan Kerja yang Suka Menjilat Atasan',
    arabic: 'اَللّٰهُمَّ اكْفِنِيْ شَرَّ الْمُنَافِقِيْنَ وَاحْفَظْ مَكَانَتِيْ بِعَدْلِكَ',
    latin: "Allaahummak-finii syarral-munaafiqiina wah-fazh makaanatii bi'adlika",
    translation: 'Ya Allah, cukupkanlah aku dari keburukan orang-orang munafik dan jagalah kedudukanku dengan keadilan-Mu.',
    category: 'Utama'
  },
  {
    id: 498,
    title: 'Doa Saat Tiba di Hotel / Tempat Menginap Saat Liburan',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ هٰذِهِ الْإِقَامَةِ وَعَافِنَا فِيْ أَبْدَانِنَا',
    latin: "Allaahumma innii as'aluka khaira haadzihil-iqaamati wa 'aafinaa fii abdaaninaa",
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan tempat menginap ini dan sehatkanlah tubuh kami.',
    category: 'Harian'
  },
  {
    id: 499,
    title: 'Doa Saat Menghadapi Macet Parah di Perjalanan',
    arabic: 'اَللّٰهُمَّ اجْعَلْ طَرِيْقَنَا سَهْلاً وَيَسِّرْ لَنَا سَفَرَنَا',
    latin: "Allaahumma-j'al thariiqanaa sahlaan wa yassir lanaa safaranaa",
    translation: 'Ya Allah, jadikanlah jalan kami lancar/mudah dan mudahkanlah perjalanan kami.',
    category: 'Harian'
  },
  {
    id: 500,
    title: 'Doa Saat Melihat Cahaya Bulan Purnama yang Terang',
    arabic: 'سُبْحَانَ مَنْ نَوَّرَ الْقَمَرَ جَمَالاً لِلْعَالَمِيْنَ',
    latin: "Subhaana man nawwaral-qamara jamaalaan lil-'aalamiin",
    translation: 'Maha Suci Zat yang menerangi bulan sebagai keindahan bagi seluruh alam.',
    category: 'Alam'
  },
  {
    id: 501,
    title: 'Doa Memohon Ampunan dan Kebaikan bagi Kaum Muslimin (QS. Nuh: 28)',
    arabic: 'رَّبِّ اغْفِرْ لِي وَلِوَALِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ',
    latin: "Rabbigh-fir lii wa liwaalidayya wa liman dakhala baitiya mu'muinan wa lil-mu'miniina wal-mu'minaat",
    translation: 'Ya Tuhanku, ampunilah aku, ibu bapakku, dan siapa saja yang memasuki rumahku dengan beriman, serta semua orang yang beriman laki-laki dan perempuan.',
    category: 'Utama'
  }
]

export default doaList
