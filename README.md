\# Interviewly



\*\*Interviewly\*\* هو موقع لتدريب المستخدمين على المقابلات الوظيفية وتحليل السير الذاتية.



\## مميزات المشروع

\- تسجيل ومتابعة الجلسات التدريبية

\- تحليل السير الذاتية

\- إدارة المقابلات وتجارب المستخدمين

\- لوحة تحكم للمستخدم والمسؤول



\## لقطات شاشة للواجهة

!\[Dashboard](screenshots/dashboard.png)

!\[جلسة تدريبية](screenshots/session.png)



> لاحقًا استبدل الصور باللقطات الفعلية لمشروعك داخل مجلد `screenshots/`.



\## طريقة التشغيل محليًا

1\. انسخ المشروع إلى جهازك:

```powershell

git clone https://github.com/namex308-stack/Interviewly.git

cd Interviewly



composer install

npm install





copy .env.example .env



DB\_CONNECTION=pgsql

DB\_HOST=aws-1-eu-west-2.pooler.supabase.com

DB\_PORT=5432

DB\_DATABASE=postgres

DB\_USERNAME=postgres.ahmdrknvcejtfszolhkb

DB\_PASSWORD=YOUR\_DB\_PASSWORD

DB\_SCHEMA=public

DB\_SSLMODE=require





php artisan key:generate

php artisan migrate

php artisan serve









npm run dev













Subscription Plan



Supabase Free Plan: Available for free, includes Pooler for database connection.



Supabase Paid Plan: $4 per month for direct IPv4 access to each database.



Vecrel: Pays according to usage (see the official Vecrel website).



Website Demo Link



Live Demo



<!-- Insert demo link here if available -->











Important Git Commands

git add .

git commit -m "وصف التعديل هنا"

git push origin main







app/

bootstrap/

config/

database/

public/

resources/

routes/

artisan

composer.json

package.json





























