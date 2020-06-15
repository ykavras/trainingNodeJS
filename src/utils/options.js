const mongoose = require('mongoose');
const AdminBro = require('admin-bro');
const theme = require('./theme');
const {MovieAdminOptions} = require('../models/Movie');
const {RegisterAdminOptions} = require('../models/Register');

module.exports = {
	databases: [mongoose],
	rootPath: '/admin',
	branding: {
		favicon: 'http://istakip.akcadag.com.tr/favicon.ico',
		logo: 'http://istakip.akcadag.com.tr/static/media/logo.43f48959.svg',
		softwareBrothers: false,
		companyName: 'Test',
		theme,
	},
	resources: [
		{...RegisterAdminOptions},
		{...MovieAdminOptions}
	],
	dashboard: {
		component: AdminBro.bundle('../admin-templates/dashboard-component')
	},
	locale: {
		language: 'tr',
		translations: {
			actions: {
				new: 'Yeni',
				edit: 'Düzenle',
				show: 'Göster',
				list: 'Listelenen',
				delete: 'Sil',
			},
			properties: {
				email: 'E-Posta',
				password: 'Parola',
				name: 'İsim',
				surname: 'Soyisim',
				address: 'Adres',
				phone: 'Telefon',
				createdAt: 'Oluşturma Tarihi',
				rating: 'Değerlendirme',
				duration: 'Süre',
				summary: 'Özet',
				coverURL: 'Kapak Görseli',
			},
			messages: {
				successfullyUpdatedGivenRecord: 'Başarıyla güncellendi.'
			},
			buttons: {
				login: 'Giriş Yap',
				logout: 'Çıkış Yap',
				filter: 'Filtrele',
				save: 'Kaydet',
				applyChanges: 'Değişiklikleri Uygula',
				Selected: 'Seçilenler'
			},
			labels: {
				Register: 'Kayıtlar',
				Movie: 'Filmler',
			},
		}
	},
};
