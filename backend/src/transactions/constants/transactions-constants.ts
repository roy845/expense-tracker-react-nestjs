import { registerEnumType } from '@nestjs/graphql';

export enum TransactionType {
  Expense = 'Expense',
  Income = 'Income',
}

export enum Category {
  // 💼 Work & Business
  Work = 'Work',
  Freelance = 'Freelance',
  Salary = 'Salary',
  Investments = 'Investments',
  OFFICE_SUPPLIES = 'OFFICE_SUPPLIES',
  WORK_TRAVEL = 'WORK_TRAVEL',
  BUSINESS_SOFTWARE = 'BUSINESS_SOFTWARE',
  PROFESSIONAL_SERVICES = 'PROFESSIONAL_SERVICES',
  MARKETING_ADVERTISING = 'MARKETING_ADVERTISING',

  // 🍽️ Food & Dining
  Groceries = 'Groceries',
  Restaurants = 'Restaurants',
  FOOD = 'FOOD',
  FAST_FOOD = 'FAST_FOOD',
  COFFEE_SHOPS = 'COFFEE_SHOPS',
  ALCOHOL_BARS = 'ALCOHOL_BARS',

  // 🚗 Transportation
  Transportation = 'Transportation',
  PUBLIC_TRANSPORT = 'PUBLIC_TRANSPORT',
  RIDE_SHARING = 'RIDE_SHARING',
  CAR_PAYMENT = 'CAR_PAYMENT',
  CAR_INSURANCE = 'CAR_INSURANCE',
  FUEL_GAS = 'FUEL_GAS',
  VEHICLE_MAINTENANCE = 'VEHICLE_MAINTENANCE',

  // 🏠 Essential Living Expenses
  Housing = 'Housing',
  RENT_MORTGAGE = 'RENT_MORTGAGE',
  PROPERTY_TAX = 'PROPERTY_TAX',
  HOME_MAINTENANCE = 'HOME_MAINTENANCE',
  Utilities = 'Utilities',
  GAS_ELECTRICITY = 'GAS_ELECTRICITY',
  WATER_SEWAGE = 'WATER_SEWAGE',
  INTERNET_CABLE = 'INTERNET_CABLE',
  PHONE_BILL = 'PHONE_BILL',

  // 📚 Education & Self-Improvement
  Education = 'Education',
  ONLINE_COURSES = 'ONLINE_COURSES',
  BOOKS_LEARNING = 'BOOKS_LEARNING',
  WORKSHOPS_TRAINING = 'WORKSHOPS_TRAINING',
  Subscriptions = 'Subscriptions',

  // 🏥 Health & Wellness
  Healthcare = 'Healthcare',
  MEDICAL_BILLS = 'MEDICAL_BILLS',
  HEALTH_INSURANCE = 'HEALTH_INSURANCE',
  DENTAL_CARE = 'DENTAL_CARE',
  VISION_CARE = 'VISION_CARE',
  FITNESS_GYM = 'FITNESS_GYM',
  MENTAL_HEALTH_THERAPY = 'MENTAL_HEALTH_THERAPY',

  // 🎉 Entertainment & Leisure
  Entertainment = 'Entertainment',
  MOVIES_STREAMING = 'MOVIES_STREAMING',
  CONCERTS_EVENTS = 'CONCERTS_EVENTS',
  VIDEO_GAMES = 'VIDEO_GAMES',
  HOBBIES_CRAFTS = 'HOBBIES_CRAFTS',
  OUTDOOR_ACTIVITIES = 'OUTDOOR_ACTIVITIES',

  // 🎁 Personal & Shopping
  Personal = 'Personal',
  CLOTHING_FASHION = 'CLOTHING_FASHION',
  BEAUTY_COSMETICS = 'BEAUTY_COSMETICS',
  ELECTRONICS_GADGETS = 'ELECTRONICS_GADGETS',
  JEWELRY_ACCESSORIES = 'JEWELRY_ACCESSORIES',
  GIFTS_DONATIONS = 'GIFTS_DONATIONS',

  // 🛡️ Insurance & Financial
  LIFE_INSURANCE = 'LIFE_INSURANCE',
  CAR_INSURANCE_FINANCIAL = 'CAR_INSURANCE_FINANCIAL',
  HOME_INSURANCE = 'HOME_INSURANCE',
  RETIREMENT_SAVINGS = 'RETIREMENT_SAVINGS',
  INVESTMENTS_STOCKS = 'INVESTMENTS_STOCKS',

  // 🐶 Pets
  Pets = 'Pets',
  PET_FOOD_SUPPLIES = 'PET_FOOD_SUPPLIES',
  VETERINARY_CARE = 'VETERINARY_CARE',
  PET_GROOMING_TRAINING = 'PET_GROOMING_TRAINING',

  // ✈️ Travel & Vacation
  Travel = 'Travel',
  Flights = 'Flights',
  HOTELS_ACCOMMODATION = 'HOTELS_ACCOMMODATION',
  CAR_RENTAL = 'CAR_RENTAL',
  TRAVEL_INSURANCE = 'TRAVEL_INSURANCE',
  TOURIST_ACTIVITIES = 'TOURIST_ACTIVITIES',

  // 🆕 Miscellaneous
  CHARITY_DONATIONS = 'CHARITY_DONATIONS',
  BANK_FEES_CHARGES = 'BANK_FEES_CHARGES',
  LOTTERY_GAMBLING = 'LOTTERY_GAMBLING',
  TAXES_GOVERNMENT_FEES = 'TAXES_GOVERNMENT_FEES',
  EMERGENCY_FUND = 'EMERGENCY_FUND',
  Other = 'Other',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_PAYMENT = 'MOBILE_PAYMENT',
  OTHER = 'OTHER',
}

registerEnumType(TransactionType, { name: 'TransactionType' });
registerEnumType(Category, { name: 'Category' });
registerEnumType(PaymentMethod, { name: 'PaymentMethod' });
