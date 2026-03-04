/**
 * MegaCalc Pro - Calculator Configuration Engine
 */
export const calculatorCategories = [
    { id: 'finance', icon: 'Wallet' },
    { id: 'health', icon: 'Activity' },
    { id: 'math', icon: 'Divide' },
    { id: 'daily', icon: 'Clock' },
    { id: 'engineering', icon: 'Cpu' }
];

export const calculators = [
    // FINANCE
    {
        id: 'emi-calculator',
        category: 'finance',
        name: { en: 'EMI Calculator', hi: 'ईएमआई कैलकुलेटर' },
        description: { en: 'Calculate monthly installments for home, car, or personal loans.', hi: 'होम, कार या व्यक्तिगत ऋण के लिए मासिक किस्तों की गणना करें।' },
        slug: 'emi-calculator',
        inputs: [
            { id: 'p', label: { en: 'Loan Amount (₹)', hi: 'ऋण राशि (₹)' }, type: 'number', default: 1000000 },
            { id: 'r', label: { en: 'Interest Rate (%)', hi: 'ब्याज दर (%)' }, type: 'number', default: 8.5 },
            { id: 'n', label: { en: 'Tenure (Years)', hi: 'अवधि (वर्ष)' }, type: 'number', default: 20 }
        ],
        calculate: (vals) => {
            const p = vals.p;
            const r = vals.r / 12 / 100;
            const n = vals.n * 12;
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const totalPayable = emi * n;
            const totalInterest = totalPayable - p;
            return { emi, totalInterest, totalPayable };
        }
    },
    {
        id: 'sip-calculator',
        category: 'finance',
        name: { en: 'SIP Calculator', hi: 'एसआईपी कैलकुलेटर' },
        description: { en: 'Estimate your future wealth with systematic investment plans.', hi: 'व्यवस्थित निवेश योजनाओं के साथ अपने भविष्य के धन का अनुमान लगाएं।' },
        slug: 'sip-calculator',
        inputs: [
            { id: 'm', label: { en: 'Monthly Investment (₹)', hi: 'मासिक निवेश (₹)' }, type: 'number', default: 5000 },
            { id: 'r', label: { en: 'Expected Return (%)', hi: 'अपेक्षित रिटर्न (%)' }, type: 'number', default: 12 },
            { id: 'n', label: { en: 'Time Period (Years)', hi: 'समय अवधि (वर्ष)' }, type: 'number', default: 10 }
        ],
        calculate: (vals) => {
            const p = vals.m;
            const r = vals.r / 12 / 100;
            const n = vals.n * 12;
            const total = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
            const invested = p * n;
            const gains = total - invested;
            return { invested, gains, total };
        }
    },
    {
        id: 'fd-calculator',
        category: 'finance',
        name: { en: 'FD Calculator', hi: 'एफडी कैलकुलेटर' },
        description: { en: 'Calculate Fixed Deposit returns and interest earned.', hi: 'फिक्स्ड डिपॉजिट रिटर्न और अर्जित ब्याज की गणना करें।' },
        slug: 'fd-calculator',
        inputs: [
            { id: 'p', label: { en: 'Principal Amount (₹)', hi: 'मूल राशि (₹)' }, type: 'number', default: 100000 },
            { id: 'r', label: { en: 'Interest Rate (%)', hi: 'ब्याज दर (%)' }, type: 'number', default: 7 },
            { id: 'n', label: { en: 'Tenure (Years)', hi: 'अवधि (वर्ष)' }, type: 'number', default: 5 }
        ],
        calculate: (vals) => {
            const p = vals.p;
            const r = vals.r / 100;
            const n = vals.n;
            const total = p * Math.pow(1 + r, n);
            const interest = total - p;
            return { principal: p, interest, total };
        }
    },
    {
        id: 'gst-calculator',
        category: 'finance',
        name: { en: 'GST Calculator', hi: 'जीएसटी कैलकुलेटर' },
        description: { en: 'Calculate GST inclusive or exclusive amounts with India tax slabs.', hi: 'भारत के टैक्स स्लैब के साथ जीएसटी समावेशी या अनन्य राशि की गणना करें।' },
        slug: 'gst-calculator',
        inputs: [
            { id: 'amount', label: { en: 'Amount (₹)', hi: 'राशि (₹)' }, type: 'number', default: 1000 },
            { id: 'rate', label: { en: 'GST Rate (%)', hi: 'जीएसटी दर (%)' }, type: 'select', options: [5, 12, 18, 28], default: 18 },
            { id: 'type', label: { en: 'Type', hi: 'प्रकार' }, type: 'radio', options: [{v:'add', l:{en:'Add GST', hi:'जीएसटी जोड़ें'}}, {v:'remove', l:{en:'Remove GST', hi:'जीएसटी हटाएं'}}], default: 'add' }
        ],
        calculate: (vals) => {
            const amt = vals.amount;
            const rate = vals.rate;
            let gst, total;
            if (vals.type === 'add') {
                gst = (amt * rate) / 100;
                total = amt + gst;
            } else {
                total = amt;
                const base = amt / (1 + rate / 100);
                gst = amt - base;
            }
            return { gst, total, cgst: gst/2, sgst: gst/2 };
        }
    },
    {
        id: 'profit-margin',
        category: 'finance',
        name: { en: 'Profit Margin', hi: 'लाभ मार्जिन' },
        description: { en: 'Calculate gross profit and margin percentages.', hi: 'सकल लाभ और मार्जिन प्रतिशत की गणना करें।' },
        slug: 'profit-margin',
        inputs: [
            { id: 'cost', label: { en: 'Cost Price (₹)', hi: 'लागत मूल्य (₹)' }, type: 'number', default: 500 },
            { id: 'revenue', label: { en: 'Selling Price (₹)', hi: 'विक्रय मूल्य (₹)' }, type: 'number', default: 800 }
        ],
        calculate: (vals) => {
            const profit = vals.revenue - vals.cost;
            const margin = (profit / vals.revenue) * 100;
            return { profit, margin: margin.toFixed(2) + '%' };
        }
    },
    // HEALTH
    {
        id: 'bmi-calculator',
        category: 'health',
        name: { en: 'BMI Calculator', hi: 'बीएमआई कैलकुलेटर' },
        description: { en: 'Calculate your Body Mass Index and health category.', hi: 'अपने बॉडी मास इंडेक्स और स्वास्थ्य श्रेणी की गणना करें।' },
        slug: 'bmi-calculator',
        inputs: [
            { id: 'weight', label: { en: 'Weight (kg)', hi: 'वजन (किग्रा)' }, type: 'number', default: 70 },
            { id: 'height', label: { en: 'Height (cm)', hi: 'ऊंचाई (सेमी)' }, type: 'number', default: 170 }
        ],
        calculate: (vals) => {
            const h = vals.height / 100;
            const bmi = vals.weight / (h * h);
            let cat = 'Normal';
            if (bmi < 18.5) cat = 'Underweight';
            else if (bmi >= 25 && bmi < 30) cat = 'Overweight';
            else if (bmi >= 30) cat = 'Obese';
            return { bmi: bmi.toFixed(2), category: cat };
        }
    },
    {
        id: 'bmr-calculator',
        category: 'health',
        name: { en: 'BMR Calculator', hi: 'बीएमआर कैलकुलेटर' },
        description: { en: 'Calculate your Basal Metabolic Rate (calories burned at rest).', hi: 'अपने बेसल मेटाबॉलिक रेट (आराम के समय जली हुई कैलोरी) की गणना करें।' },
        slug: 'bmr-calculator',
        inputs: [
            { id: 'gender', label: { en: 'Gender', hi: 'लिंग' }, type: 'radio', options: [{v:'m', l:{en:'Male', hi:'पुरुष'}}, {v:'f', l:{en:'Female', hi:'महिला'}}], default: 'm' },
            { id: 'weight', label: { en: 'Weight (kg)', hi: 'वजन (किग्रा)' }, type: 'number', default: 70 },
            { id: 'height', label: { en: 'Height (cm)', hi: 'ऊंचाई (सेमी)' }, type: 'number', default: 170 },
            { id: 'age', label: { en: 'Age', hi: 'आयु' }, type: 'number', default: 25 }
        ],
        calculate: (vals) => {
            let bmr;
            if (vals.gender === 'm') {
                bmr = 88.362 + (13.397 * vals.weight) + (4.799 * vals.height) - (5.677 * vals.age);
            } else {
                bmr = 447.593 + (9.247 * vals.weight) + (3.098 * vals.height) - (4.330 * vals.age);
            }
            return { bmr: bmr.toFixed(0) + ' kcal/day' };
        }
    },
    // MATH
    {
        id: 'scientific-calculator',
        category: 'math',
        name: { en: 'Scientific Calculator', hi: 'वैज्ञानिक कैलकुलेटर' },
        description: { en: 'Advanced math functions including trig, logs, and powers.', hi: 'त्रिकोणमिति, लॉग और पावर सहित उन्नत गणित कार्य।' },
        slug: 'scientific-calculator',
        customUI: true
    },
    {
        id: 'percentage-calculator',
        category: 'math',
        name: { en: 'Percentage Calculator', hi: 'प्रतिशत कैलकुलेटर' },
        description: { en: 'Calculate percentages, increases, and decreases.', hi: 'प्रतिशत, वृद्धि और कमी की गणना करें।' },
        slug: 'percentage-calculator',
        inputs: [
            { id: 'p', label: { en: 'What is (%)', hi: 'क्या है (%)' }, type: 'number', default: 10 },
            { id: 'v', label: { en: 'of', hi: 'का' }, type: 'number', default: 100 }
        ],
        calculate: (vals) => {
            return { result: (vals.p / 100) * vals.v };
        }
    },
    // DAILY
    {
        id: 'age-calculator',
        category: 'daily',
        name: { en: 'Age Calculator', hi: 'आयु कैलकुलेटर' },
        description: { en: 'Calculate your exact age in years, months, and days.', hi: 'वर्षों, महीनों और दिनों में अपनी सटीक आयु की गणना करें।' },
        slug: 'age-calculator',
        inputs: [
            { id: 'dob', label: { en: 'Date of Birth', hi: 'जन्म तिथि' }, type: 'date', default: '1990-01-01' }
        ],
        calculate: (vals) => {
            const birth = new Date(vals.dob);
            const now = new Date();
            let years = now.getFullYear() - birth.getFullYear();
            let months = now.getMonth() - birth.getMonth();
            let days = now.getDate() - birth.getDate();
            if (days < 0) { months--; days += 30; }
            if (months < 0) { years--; months += 12; }
            return { age: `${years}y ${months}m ${days}d` };
        }
    },
    {
        id: 'fuel-cost',
        category: 'daily',
        name: { en: 'Fuel Cost Calculator', hi: 'ईंधन लागत कैलकुलेटर' },
        description: { en: 'Calculate the cost of fuel for your trip.', hi: 'अपनी यात्रा के लिए ईंधन की लागत की गणना करें।' },
        slug: 'fuel-cost',
        inputs: [
            { id: 'dist', label: { en: 'Distance (km)', hi: 'दूरी (किमी)' }, type: 'number', default: 100 },
            { id: 'mileage', label: { en: 'Mileage (km/l)', hi: 'माइलेज (किमी/ली)' }, type: 'number', default: 15 },
            { id: 'price', label: { en: 'Fuel Price (₹/l)', hi: 'ईंधन की कीमत (₹/ली)' }, type: 'number', default: 100 }
        ],
        calculate: (vals) => {
            const cost = (vals.dist / vals.mileage) * vals.price;
            return { cost: '₹' + cost.toFixed(2) };
        }
    },
    // ENGINEERING
    {
        id: 'ohms-law',
        category: 'engineering',
        name: { en: "Ohm's Law", hi: 'ओम का नियम' },
        description: { en: 'Calculate Voltage, Current, or Resistance.', hi: 'वोल्टेज, करंट या प्रतिरोध की गणना करें।' },
        slug: 'ohms-law',
        inputs: [
            { id: 'v', label: { en: 'Voltage (V)', hi: 'वोल्टेज (V)' }, type: 'number', default: 12 },
            { id: 'i', label: { en: 'Current (A)', hi: 'करंट (A)' }, type: 'number', default: 2 }
        ],
        calculate: (vals) => {
            return { resistance: (vals.v / vals.i).toFixed(2) + ' Ω', power: (vals.v * vals.i).toFixed(2) + ' W' };
        }
    },
    {
        id: 'compound-interest',
        category: 'finance',
        name: { en: 'Compound Interest', hi: 'चक्रवृद्धि ब्याज' },
        description: { en: 'Calculate interest on interest for your savings.', hi: 'अपनी बचत के लिए ब्याज पर ब्याज की गणना करें।' },
        slug: 'compound-interest',
        inputs: [
            { id: 'p', label: { en: 'Principal (₹)', hi: 'मूलधन (₹)' }, type: 'number', default: 10000 },
            { id: 'r', label: { en: 'Rate (%)', hi: 'दर (%)' }, type: 'number', default: 10 },
            { id: 't', label: { en: 'Time (Years)', hi: 'समय (वर्ष)' }, type: 'number', default: 5 },
            { id: 'n', label: { en: 'Compounding', hi: 'चक्रवृद्धि' }, type: 'select', options: [1, 2, 4, 12], default: 12 }
        ],
        calculate: (vals) => {
            const amount = vals.p * Math.pow(1 + (vals.r / 100 / vals.n), vals.n * vals.t);
            return { totalAmount: amount.toFixed(2), interest: (amount - vals.p).toFixed(2) };
        }
    },
    {
        id: 'cagr-calculator',
        category: 'finance',
        name: { en: 'CAGR Calculator', hi: 'सीएजीआर कैलकुलेटर' },
        description: { en: 'Calculate Compound Annual Growth Rate.', hi: 'चक्रवृद्धि वार्षिक विकास दर की गणना करें।' },
        slug: 'cagr-calculator',
        inputs: [
            { id: 'start', label: { en: 'Initial Value', hi: 'प्रारंभिक मूल्य' }, type: 'number', default: 10000 },
            { id: 'end', label: { en: 'Final Value', hi: 'अंतिम मूल्य' }, type: 'number', default: 25000 },
            { id: 'years', label: { en: 'Duration (Years)', hi: 'अवधि (वर्ष)' }, type: 'number', default: 5 }
        ],
        calculate: (vals) => {
            const cagr = (Math.pow(vals.end / vals.start, 1 / vals.years) - 1) * 100;
            return { cagr: cagr.toFixed(2) + '%' };
        }
    },
    {
        id: 'ideal-weight',
        category: 'health',
        name: { en: 'Ideal Weight', hi: 'आदर्श वजन' },
        description: { en: 'Calculate your ideal body weight based on height.', hi: 'ऊंचाई के आधार पर अपने आदर्श शरीर के वजन की गणना करें।' },
        slug: 'ideal-weight',
        inputs: [
            { id: 'height', label: { en: 'Height (cm)', hi: 'ऊंचाई (सेमी)' }, type: 'number', default: 170 },
            { id: 'gender', label: { en: 'Gender', hi: 'लिंग' }, type: 'radio', options: [{v:'m', l:{en:'Male', hi:'पुरुष'}}, {v:'f', l:{en:'Female', hi:'महिला'}}], default: 'm' }
        ],
        calculate: (vals) => {
            const h = vals.height;
            let weight;
            if (vals.gender === 'm') weight = 50 + 0.91 * (h - 152.4);
            else weight = 45.5 + 0.91 * (h - 152.4);
            return { idealWeight: weight.toFixed(1) + ' kg' };
        }
    },
    {
        id: 'water-intake',
        category: 'health',
        name: { en: 'Water Intake', hi: 'पानी का सेवन' },
        description: { en: 'Calculate how much water you should drink daily.', hi: 'गणना करें कि आपको प्रतिदिन कितना पानी पीना चाहिए।' },
        slug: 'water-intake',
        inputs: [
            { id: 'weight', label: { en: 'Weight (kg)', hi: 'वजन (किग्रा)' }, type: 'number', default: 70 }
        ],
        calculate: (vals) => {
            return { dailyWater: (vals.weight * 0.033).toFixed(2) + ' Liters' };
        }
    },
    {
        id: 'lcm-hcf',
        category: 'math',
        name: { en: 'LCM & HCF', hi: 'एलसीएम और एचसीएफ' },
        description: { en: 'Find Least Common Multiple and Highest Common Factor.', hi: 'लघुत्तम समापवर्त्य और महत्तम समापवर्तक ज्ञात करें।' },
        slug: 'lcm-hcf',
        inputs: [
            { id: 'n1', label: { en: 'Number 1', hi: 'संख्या 1' }, type: 'number', default: 12 },
            { id: 'n2', label: { en: 'Number 2', hi: 'संख्या 2' }, type: 'number', default: 18 }
        ],
        calculate: (vals) => {
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            const hcf = gcd(vals.n1, vals.n2);
            const lcm = (vals.n1 * vals.n2) / hcf;
            return { lcm, hcf };
        }
    },
    {
        id: 'tip-calculator',
        category: 'daily',
        name: { en: 'Tip Calculator', hi: 'टिप कैलकुलेटर' },
        description: { en: 'Calculate tip and split the bill among friends.', hi: 'टिप की गणना करें और दोस्तों के बीच बिल विभाजित करें।' },
        slug: 'tip-calculator',
        inputs: [
            { id: 'bill', label: { en: 'Bill Amount (₹)', hi: 'बिल राशि (₹)' }, type: 'number', default: 1000 },
            { id: 'tip', label: { en: 'Tip (%)', hi: 'टिप (%)' }, type: 'number', default: 10 },
            { id: 'people', label: { en: 'Number of People', hi: 'लोगों की संख्या' }, type: 'number', default: 2 }
        ],
        calculate: (vals) => {
            const totalTip = (vals.bill * vals.tip) / 100;
            const totalBill = vals.bill + totalTip;
            return { totalTip, totalBill, perPerson: (totalBill / vals.people).toFixed(2) };
        }
    },
    {
        id: 'rd-calculator',
        category: 'finance',
        name: { en: 'RD Calculator', hi: 'आरडी कैलकुलेटर' },
        description: { en: 'Calculate Recurring Deposit returns.', hi: 'आवर्ती जमा रिटर्न की गणना करें।' },
        slug: 'rd-calculator',
        inputs: [
            { id: 'p', label: { en: 'Monthly Deposit (₹)', hi: 'मासिक जमा (₹)' }, type: 'number', default: 2000 },
            { id: 'r', label: { en: 'Interest Rate (%)', hi: 'ब्याज दर (%)' }, type: 'number', default: 6.5 },
            { id: 'n', label: { en: 'Tenure (Years)', hi: 'अवधि (वर्ष)' }, type: 'number', default: 3 }
        ],
        calculate: (vals) => {
            const p = vals.p;
            const r = vals.r / 100;
            const n = vals.n * 12;
            // Formula for RD maturity value: MV = P * (1 + r/n)^(nt) - no, that's compound.
            // Indian RD formula: MV = P * n + P * n * (n+1) * r / (24 * 100)
            const maturity = p * n + (p * n * (n + 1) * vals.r) / (2400);
            return { invested: p * n, interest: (maturity - p * n).toFixed(2), total: maturity.toFixed(2) };
        }
    },
    {
        id: 'inflation-calculator',
        category: 'finance',
        name: { en: 'Inflation Calculator', hi: 'मुद्रास्फीति कैलकुलेटर' },
        description: { en: 'Calculate how inflation affects your money over time.', hi: 'गणना करें कि मुद्रास्फीति समय के साथ आपके पैसे को कैसे प्रभावित करती है।' },
        slug: 'inflation-calculator',
        inputs: [
            { id: 'amount', label: { en: 'Current Amount (₹)', hi: 'वर्तमान राशि (₹)' }, type: 'number', default: 100000 },
            { id: 'rate', label: { en: 'Inflation Rate (%)', hi: 'मुद्रास्फीति दर (%)' }, type: 'number', default: 6 },
            { id: 'years', label: { en: 'Years', hi: 'वर्ष' }, type: 'number', default: 10 }
        ],
        calculate: (vals) => {
            const futureValue = vals.amount * Math.pow(1 + vals.rate / 100, vals.years);
            return { futureValue: futureValue.toFixed(2), lossInValue: (futureValue - vals.amount).toFixed(2) };
        }
    },
    {
        id: 'body-fat',
        category: 'health',
        name: { en: 'Body Fat Calculator', hi: 'बॉडी फैट कैलकुलेटर' },
        description: { en: 'Estimate your body fat percentage using the US Navy method.', hi: 'यूएस नेवी पद्धति का उपयोग करके अपने शरीर में वसा प्रतिशत का अनुमान लगाएं।' },
        slug: 'body-fat',
        inputs: [
            { id: 'gender', label: { en: 'Gender', hi: 'लिंग' }, type: 'radio', options: [{v:'m', l:{en:'Male', hi:'पुरुष'}}, {v:'f', l:{en:'Female', hi:'महिला'}}], default: 'm' },
            { id: 'weight', label: { en: 'Weight (kg)', hi: 'वजन (किग्रा)' }, type: 'number', default: 70 },
            { id: 'waist', label: { en: 'Waist (cm)', hi: 'कमर (सेमी)' }, type: 'number', default: 85 },
            { id: 'neck', label: { en: 'Neck (cm)', hi: 'गर्दन (सेमी)' }, type: 'number', default: 38 },
            { id: 'height', label: { en: 'Height (cm)', hi: 'ऊंचाई (सेमी)' }, type: 'number', default: 170 }
        ],
        calculate: (vals) => {
            let bf;
            if (vals.gender === 'm') {
                bf = 495 / (1.0324 - 0.19077 * Math.log10(vals.waist - vals.neck) + 0.15456 * Math.log10(vals.height)) - 450;
            } else {
                // Simplified female formula
                bf = 495 / (1.29579 - 0.35004 * Math.log10(vals.waist + 90 - vals.neck) + 0.22100 * Math.log10(vals.height)) - 450;
            }
            return { bodyFat: bf.toFixed(1) + '%' };
        }
    }
];
