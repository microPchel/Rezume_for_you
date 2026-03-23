document.addEventListener('DOMContentLoaded', function () {
    const portret = document.getElementById('portret');
    const photoUpload = document.getElementById('photo-upload');

    if (portret && photoUpload) {
        portret.addEventListener('click', () => photoUpload.click());
        photoUpload.addEventListener('change', function () {
            if (this.files?.[0]) {
                const reader = new FileReader();
                reader.onload = (e) => portret.src = e.target.result;
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    const pdfButton = document.getElementById('button');
    if (pdfButton && window.html2canvas && window.jspdf) {
        pdfButton.addEventListener('click', function (e) {
            e.preventDefault();

            pdfButton.style.display = 'none';

            html2canvas(document.body, {
                scale: 2,
                backgroundColor: '#ffffff'
            }).then(canvas => {
                const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
                const imgWidth = 210;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save('resume.pdf');

                pdfButton.style.display = 'block';
            }).catch(() => {
                pdfButton.style.display = 'block';
                alert('Ошибка создания PDF');
            });
        });
    }
});