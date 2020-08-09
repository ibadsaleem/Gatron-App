function phase() {
    var a = document.getElementById("myList");
    if (a.value === "1") {
        localStorage.setItem("phase", a.value);
        window.location.href = "variable1.html";
    }
    else if (a.value === "3") {
        localStorage.setItem("phase", a.value);
        window.location.href = "variable3.html";
    }
    else {
        alert("Kindly Choose Phase");
    }
}

//------------------------- Storing-----------------------------------------

//motor phase 1 storing info
function setmotor1()
{
    var vol_variable=localStorage.getItem("linevoltage");
    var freq_variable=localStorage.getItem("Vfrequency");
    var variable_power=localStorage.getItem("PowerV");
    var P = document.getElementById("motorpower").value;
    localStorage.setItem("Power", P);
    var V = document.getElementById("linevolt").value;
    localStorage.setItem("voltage", V);
    var F = document.getElementById("freqlist").value;
    localStorage.setItem("frequency", F);
    var PF = document.getElementById("pfact").value;
    localStorage.setItem("factor", PF);
    if (P === "" || V === "" || F === "" || PF === "")
    {
        alert("Kindly Fill Out All Fields");
    }
    else if (Number(PF) > 1)
    {
        alert("Power Factor Should Be Between 0 to 1");
    }
    else if (Number(P) > variable_power) {
        alert("Motor Power Should Be Less than variable power")
    }
    else if (Number(V) != vol_variable || Number(F) != freq_variable) {
        alert("Motor Frequency and Voltage should be equal to Variable Frequency and Voltage")
    }
    else {
        window.location.href = "final.html";
    }

}


// motor phase 3 storing info
function setmotor3()
{
    var vol_variable=localStorage.getItem("Vvoltage");
    var freq_variable=localStorage.getItem("Vfrequency");
    var P = document.getElementById("motpower").value;
    localStorage.setItem("Power3", P);
    var V = document.getElementById("Lvolt").value;
    localStorage.setItem("voltage3", V);
    var F = document.getElementById("Freqlist").value;
    localStorage.setItem("frequency3", F);
    var PF = document.getElementById("Pfact").value;
    localStorage.setItem("factor3", PF);
    var variable_power=localStorage.getItem("PowerV");

    if (P === "" || V === "" || F === "" || PF === "")
    {
        alert("Kindly Fill Out All Fields");
    }
    else if (Number(PF) > 1)
    {
        alert("Power Factor Should Be Between 0 to 1");
    }
    else if (Number(P) > Number(variable_power)) {
        alert("Motor Power Should Be Less than Variable power")
    }
    else if (Number(V) != (vol_variable) || Number(F) != (freq_variable)) {
        alert("Motor Frequency and Voltage should be equal to Variable Frequency and Voltage")
    }
    else {
        window.location.href = "final.html";
    }

}




//setting variable frequency for phase 1
function setvar1()
{
    var Po = document.getElementById("powerlist").value;
    localStorage.setItem("PowerV", Po);
    var Vo = document.getElementById("Linevolt").value;
    localStorage.setItem("linevoltage", Vo);
    var Fr = document.getElementById("Vfreqlist").value;
    localStorage.setItem("Vfrequency", Fr);
    if (Po === "" || Vo=== "" || Fr==="")
    {
        alert("Kindly Fill Out All Fields");
    }
    else {
        window.location.href="motor1.html"
    }
}

//setting variable frequency for phase 3
function setvar3()
{
    var P = document.getElementById("powerlist1").value;
    localStorage.setItem("PowerV", P);
    var V = document.getElementById("llvolt").value;
    localStorage.setItem("Vvoltage", V);
    var F = document.getElementById("Freq").value;
    localStorage.setItem("Vfrequency", F);
    if (P === "" || V=== "" || F==="")
    {
        alert("Kindly Fill Out All Fields");
    }
    else {
        window.location.href="motor3.html"
    }
}

function setimpth()
{
    var impedence = document.getElementById("impedence").value;
    var TH = document.getElementById("TH").value;
    localStorage.setItem("Impedence", impedence);
    localStorage.setItem("target", TH);
    if (impedence === "" || TH === "")
    {
        alert("Kindly Fill Out All Fields");
    }
    else {
        window.location.href = "calculate.html";
    }

}

//-------------------------------Calculation------------------------

function checkphase()
{
    var a = localStorage.getItem("phase")
    if (Number(a) === 1)
    {
        
        calculatemotor1();
    }
    else if (Number(a) === 3)
    {
        
        calculatemotor3();
    }
    
}

function calculatemotor1()
{
    var imp = localStorage.getItem("Impedence");
    var harmonic = localStorage.getItem("target");
    var power = localStorage.getItem("Power");
    var voltage = localStorage.getItem("voltage");
    var frequency = localStorage.getItem("frequency");
    var powerfactor = localStorage.getItem("factor");
    var AWG = document.getElementById("awg");
    var area=document.getElementById("area");
    var diameter=document.getElementById("diameter");

    var linecurrent = (Number(power) * 1000) / (Number(voltage) * Number(powerfactor));
    var reactor = document.getElementById("reactor");
    reactor.innerHTML = linecurrent.toFixed(2);

    var inductance = (Number(imp) * Number(voltage)) / (2 * Math.PI * Number(frequency) * Number(linecurrent) * 100);
    var ind = document.getElementById("reactorinduct");
    ind.innerHTML = inductance.toFixed(6);
    
    var capacitor_bank = 1 / (4 * Math.PI * Math.PI * Math.pow((Number(frequency) * Number(harmonic)), 2) * inductance); 
    var cap = document.getElementById("Capacitor");
    cap.innerHTML = capacitor_bank.toFixed(7);

    if (linecurrent > 0 && linecurrent<=1.3)
    {
        AWG.innerHTML = 26;
        area.innerHTML=0.129;
        diameter.innerHTML=0.405;

    }
    else if (linecurrent > 1.3 && linecurrent<=2.1)
    {
        AWG.innerHTML = 24;
        area.innerHTML=0.205;
        diameter.innerHTML=0.511;
    }
    else if (linecurrent > 2.1 && linecurrent<=3)
    {
        AWG.innerHTML = 22;
        area.innerHTML=0.326;
        diameter.innerHTML=0.644;
    }
    else if (linecurrent > 3 && linecurrent<=5)
    {
        AWG.innerHTML = 20;
        area.innerHTML=0.518;
        diameter.innerHTML=0.812;
    }
    else if (linecurrent > 5 && linecurrent<=10)
    {
        AWG.innerHTML = 18;
        area.innerHTML=0.823;
        diameter.innerHTML=1.024;
    }
    else if (linecurrent > 10 && linecurrent<=15)
    {
        AWG.innerHTML = 15;
        area.innerHTML=1.65;
        diameter.innerHTML=1.45;
    }
    
    else if (linecurrent > 15 && linecurrent<=20)
    {
        AWG.innerHTML = 13;
        area.innerHTML=2.62;
        diameter.innerHTML=1.828;
    }
    else if (linecurrent > 20 && linecurrent<=30)
    {
        AWG.innerHTML = 11;
        area.innerHTML=4.17;
        diameter.innerHTML=2.305;
    }
    else if (linecurrent > 30 && linecurrent<=40)
    {
        AWG.innerHTML = 9;
        area.innerHTML=6.63;
        diameter.innerHTML=2.906;
    }
    else if (linecurrent > 40 && linecurrent<=55)
    {
        AWG.innerHTML = 7;
        area.innerHTML=10.5;
        diameter.innerHTML=3.665;
    }
    else if (linecurrent > 55 && linecurrent<=70)
    {
        AWG.innerHTML = 5;
        area.innerHTML=16.8;
        diameter.innerHTML=4.621;
    }
    else if (linecurrent > 70 && linecurrent<=85)
    {
        AWG.innerHTML = 3;
        area.innerHTML=26.7;
        diameter.innerHTML=5.827;
    }
    else if (linecurrent > 85 && linecurrent<=95)
    {
        AWG.innerHTML = 2;
        area.innerHTML=33.6;
        diameter.innerHTML=6.544;
    }
    else if (linecurrent > 95 && linecurrent<=110)
    {
        AWG.innerHTML = 1;
        area.innerHTML=42.4;
        diameter.innerHTML=7.348;
    }
    else if (linecurrent > 110 && linecurrent<=125)
    {
        AWG.innerHTML = 0;
        area.innerHTML=53.5;
        diameter.innerHTML=8.251;
    }
    else if (linecurrent > 125 && linecurrent<=145)
    {
        AWG.innerHTML = "00";
        area.innerHTML=67.4;
        diameter.innerHTML=9.266;
    }
    else if (linecurrent > 145 && linecurrent<=165)
    {
        AWG.innerHTML = "000";
        area.innerHTML=85;
        diameter.innerHTML=10.405;
    }
    else if (linecurrent > 165 && linecurrent<=195)
    {
        AWG.innerHTML = "0000";
        area.innerHTML=107;
        diameter.innerHTML=11.684;
    }
    else {
        AWG.innerHTML = "-";
        area.innerHTML="-";
        diameter.innerHTML="-";
    }

}

function calculatemotor3()
{
    var imp = localStorage.getItem("Impedence");
    var harmonic = localStorage.getItem("target");
    var power = localStorage.getItem("Power3");
    var voltage = localStorage.getItem("voltage3");
    var frequency = localStorage.getItem("frequency3");
    var powerfactor = localStorage.getItem("factor3");
    var AWG = document.getElementById("awg");
    var area=document.getElementById("area");
    var diameter=document.getElementById("diameter");

    var linecurrent = (Number(power) * 1000) / (Number(voltage) * Math.sqrt(3) * Number(powerfactor));
    var reactor = document.getElementById("reactor");
    reactor.innerHTML = linecurrent.toFixed(2);
   
    var inductance = (Number(imp) * Number(voltage)) / (2 * Math.sqrt(3) * Math.PI * Number(frequency) * Number(linecurrent) * 100);
    var ind = document.getElementById("reactorinduct");
    ind.innerHTML = inductance.toFixed(6);
   
    var capacitor_bank = 1 / (4 * Math.PI * Math.PI * Math.pow((Number(frequency) * Number(harmonic)), 2) * inductance); 
    var cap = document.getElementById("Capacitor");
    cap.innerHTML = capacitor_bank.toFixed(7);

    if (linecurrent > 0 && linecurrent<=1.3)
    {
        AWG.innerHTML = 26;
        area.innerHTML=0.129;
        diameter.innerHTML=0.405;

    }
    else if (linecurrent > 1.3 && linecurrent<=2.1)
    {
        AWG.innerHTML = 24;
        area.innerHTML=0.205;
        diameter.innerHTML=0.511;
    }
    else if (linecurrent > 2.1 && linecurrent<=3)
    {
        AWG.innerHTML = 22;
        area.innerHTML=0.326;
        diameter.innerHTML=0.644;
    }
    else if (linecurrent > 3 && linecurrent<=5)
    {
        AWG.innerHTML = 20;
        area.innerHTML=0.518;
        diameter.innerHTML=0.812;
    }
    else if (linecurrent > 5 && linecurrent<=10)
    {
        AWG.innerHTML = 18;
        area.innerHTML=0.823;
        diameter.innerHTML=1.024;
    }
    else if (linecurrent > 10 && linecurrent<=15)
    {
        AWG.innerHTML = 15;
        area.innerHTML=1.65;
        diameter.innerHTML=1.45;
    }
    
    else if (linecurrent > 15 && linecurrent<=20)
    {
        AWG.innerHTML = 13;
        area.innerHTML=2.62;
        diameter.innerHTML=1.828;
    }
    else if (linecurrent > 20 && linecurrent<=30)
    {
        AWG.innerHTML = 11;
        area.innerHTML=4.17;
        diameter.innerHTML=2.305;
    }
    else if (linecurrent > 30 && linecurrent<=40)
    {
        AWG.innerHTML = 9;
        area.innerHTML=6.63;
        diameter.innerHTML=2.906;
    }
    else if (linecurrent > 40 && linecurrent<=55)
    {
        AWG.innerHTML = 7;
        area.innerHTML=10.5;
        diameter.innerHTML=3.665;
    }
    else if (linecurrent > 55 && linecurrent<=70)
    {
        AWG.innerHTML = 5;
        area.innerHTML=16.8;
        diameter.innerHTML=4.621;
    }
    else if (linecurrent > 70 && linecurrent<=85)
    {
        AWG.innerHTML = 3;
        area.innerHTML=26.7;
        diameter.innerHTML=5.827;
    }
    else if (linecurrent > 85 && linecurrent<=95)
    {
        AWG.innerHTML = 2;
        area.innerHTML=33.6;
        diameter.innerHTML=6.544;
    }
    else if (linecurrent > 95 && linecurrent<=110)
    {
        AWG.innerHTML = 1;
        area.innerHTML=42.4;
        diameter.innerHTML=7.348;
    }
    else if (linecurrent > 110 && linecurrent<=125)
    {
        AWG.innerHTML = 0;
        area.innerHTML=53.5;
        diameter.innerHTML=8.251;
    }
    else if (linecurrent > 125 && linecurrent<=145)
    {
        AWG.innerHTML = "00";
        area.innerHTML=67.4;
        diameter.innerHTML=9.266;
    }
    else if (linecurrent > 145 && linecurrent<=165)
    {
        AWG.innerHTML = "000";
        area.innerHTML=85;
        diameter.innerHTML=10.405;
    }
    else if (linecurrent > 165 && linecurrent<=195)
    {
        AWG.innerHTML = "0000";
        area.innerHTML=107;
        diameter.innerHTML=11.684;
    }
    else {
        AWG.innerHTML = "-";
        area.innerHTML="-";
        diameter.innerHTML="-";
    }
}
