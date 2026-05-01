// بيانات مستخرجة من المخطط (أبواب وخدمات)
const poiData = [
    { id: 1, name: "باب السلام (1)", type: "gate", coords: [500, 400], desc: "المدخل الرئيسي للزيارة" },
    { id: 2, name: "باب أبي بكر الصديق", type: "gate", coords: [520, 380], desc: "جهة الغرب" },
    { id: 3, name: "موقع مياه زمزم", type: "service", coords: [450, 450], desc: "نقطة شرب عامة" },
    { id: 4, name: "مكتب إرشاد التائهين", type: "service", coords: [300, 600], desc: "خلف الحصوة الثانية" },
    { id: 5, name: "مركز إسعاف (2)", type: "health", coords: [200, 300], desc: "خدمة طبية طارئة" },
    { id: 6, name: "باب فهد (21)", type: "gate", coords: [800, 410], desc: "توسعة الملك فهد" }
];

// إعداد الخريطة باستخدام نظام الإحداثيات البسيط (للصور)
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1
});

// أبعاد الصورة (يجب ضبطها حسب حجم صورتك)
var bounds = [[0, 0], [1000, 1000]]; 
var image = L.imageOverlay('nabawi-map.png', bounds).addTo(map);

map.fitBounds(bounds);

var markersLayer = L.layerGroup().addTo(map);

// وظيفة رسم النقاط
function renderLocations(data) {
    markersLayer.clearLayers();
    const listContainer = document.getElementById('location-list');
    listContainer.innerHTML = '';

    data.forEach(item => {
        // إضافة Marker للخريطة
        var marker = L.marker(item.coords).addTo(markersLayer)
            .bindPopup(`<b>${item.name}</b><br>${item.desc}`);

        // إضافة للقائمة الجانبية
        const div = document.createElement('div');
        div.className = 'location-item';
        div.innerHTML = `<strong>${item.name}</strong><br><small>${item.type}</small>`;
        div.onclick = () => {
            map.setView(item.coords, 1);
            marker.openPopup();
        };
        listContainer.appendChild(div);
    });
}

// تصفية البيانات
function filterMap(category) {
    const filtered = category === 'all' ? poiData : poiData.filter(i => i.type === category);
    renderLocations(filtered);
    
    // تحديث شكل الأزرار
    document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

// البحث
function searchLocation() {
    const term = document.getElementById('searchBar').value.toLowerCase();
    const filtered = poiData.filter(i => i.name.toLowerCase().includes(term));
    renderLocations(filtered);
}

// تشغيل عند البداية
renderLocations(poiData);
