import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface RegionData {
  name: string;
  regionId: string;
  totalUsers: string;
  usersLabel: string;
  averageResultLabel: string;
  averageResultValue: string;
  inProgressLabel: string;
  inProgressValue: string;
  inProgressIcon?: string;
  completedLabel: string;
  completedValue: string;
  completedIcon?: string;
  certificatesLabel: string;
  certificatesValue: string;
  certificatesIcon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getDashboardData(): Observable<RegionData[]> {
    const mockData: RegionData[] = [
      {
        name: 'Ташкент',
        regionId: 'tashkent',
        totalUsers: '2,420',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Самаркандская область',
        regionId: 'samarkand',
        totalUsers: '1,340',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Наманганская область',
        regionId: 'namangan',
        totalUsers: '926',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Сурхандарьинская область',
        regionId: 'surkhandarya',
        totalUsers: '875',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Ферганская область',
        regionId: 'fergana',
        totalUsers: '759',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Кашкадарьинская область',
        regionId: 'kashkadarya',
        totalUsers: '714',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Сырдарьинская область',
        regionId: 'syrdarya',
        totalUsers: '653',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Хорезмская область',
        regionId: 'khorezm',
        totalUsers: '582',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Джизакская область',
        regionId: 'jizzakh',
        totalUsers: '327',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Бухарская область',
        regionId: 'bukhara',
        totalUsers: '256',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Республика Каракалпакистан',
        regionId: 'karakalpakstan',
        totalUsers: '204',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Навоийская область',
        regionId: 'navoi',
        totalUsers: '147',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Андижанская область',
        regionId: 'andijan',
        totalUsers: '520',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
      {
        name: 'Ташкентская область',
        regionId: 'tashkentRegion',
        totalUsers: '460',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '86.9%',
        completedLabel: 'Завершено',
        completedValue: '248',
        certificatesLabel: 'Сертификаты',
        certificatesValue: '137',
      },
    ];
    return of(mockData);
  }
}
