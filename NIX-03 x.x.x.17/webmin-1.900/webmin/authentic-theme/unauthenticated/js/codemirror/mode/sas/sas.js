!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("sas",function(){function e(e,t,r){if(r)for(var s=t.split(" "),o=0;o<s.length;o++)n[s[o]]={style:e,state:r}}function t(e,t){var a=e.next();if("/"===a&&e.eat("*"))return t.continueComment=!0,"comment";if(t.continueComment===!0)return"*"===a&&"/"===e.peek()?(e.next(),t.continueComment=!1):e.skipTo("*")?(e.skipTo("*"),e.next(),e.eat("/")&&(t.continueComment=!1)):e.skipToEnd(),"comment";if("*"==a&&e.column()==e.indentation())return e.skipToEnd(),"comment";var i=a+e.peek();if(!('"'!==a&&"'"!==a||t.continueString))return t.continueString=a,"string";if(t.continueString)return t.continueString==a?t.continueString=null:e.skipTo(t.continueString)?(e.next(),t.continueString=null):e.skipToEnd(),"string";if(null!==t.continueString&&e.eol())return e.skipTo(t.continueString)||e.skipToEnd(),"string";if(/[\d\.]/.test(a))return"."===a?e.match(/^[0-9]+([eE][\-+]?[0-9]+)?/):"0"===a?e.match(/^[xX][0-9a-fA-F]+/)||e.match(/^0[0-7]+/):e.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/),"number";if(s.test(a+e.peek()))return e.next(),"operator";if(r.hasOwnProperty(i)){if(e.next()," "===e.peek())return r[i.toLowerCase()]}else if(o.test(a))return"operator";var l;if(null!=e.match(/[%&;\w]+/,!1)){if(l=a+e.match(/[%&;\w]+/,!0),/&/.test(l))return"variable"}else l=a;if(t.nextword)return e.match(/[\w]+/),"."===e.peek()&&e.skipTo(" "),t.nextword=!1,"variable-2";if(l=l.toLowerCase(),t.inDataStep){if("run;"===l||e.match(/run\s;/))return t.inDataStep=!1,"builtin";if(l&&"."===e.next())return/\w/.test(e.peek())?"variable-2":"variable";if(l&&n.hasOwnProperty(l)&&(n[l].state.indexOf("inDataStep")!==-1||n[l].state.indexOf("ALL")!==-1)){e.start<e.pos&&e.backUp(e.pos-e.start);for(var c=0;c<l.length;++c)e.next();return n[l].style}}if(t.inProc){if("run;"===l||"quit;"===l)return t.inProc=!1,"builtin";if(l&&n.hasOwnProperty(l)&&(n[l].state.indexOf("inProc")!==-1||n[l].state.indexOf("ALL")!==-1))return e.match(/[\w]+/),n[l].style}return t.inMacro?"%mend"===l?(";"===e.peek()&&e.next(),t.inMacro=!1,"builtin"):l&&n.hasOwnProperty(l)&&(n[l].state.indexOf("inMacro")!==-1||n[l].state.indexOf("ALL")!==-1)?(e.match(/[\w]+/),n[l].style):"atom":l&&n.hasOwnProperty(l)?(e.backUp(1),e.match(/[\w]+/),"data"===l&&/=/.test(e.peek())===!1?(t.inDataStep=!0,t.nextword=!0,"builtin"):"proc"===l?(t.inProc=!0,t.nextword=!0,"builtin"):"%macro"===l?(t.inMacro=!0,t.nextword=!0,"builtin"):/title[1-9]/.test(l)?"def":"footnote"===l?(e.eat(/[1-9]/),"def"):t.inDataStep===!0&&n[l].state.indexOf("inDataStep")!==-1?n[l].style:t.inProc===!0&&n[l].state.indexOf("inProc")!==-1?n[l].style:t.inMacro===!0&&n[l].state.indexOf("inMacro")!==-1?n[l].style:n[l].state.indexOf("ALL")!==-1?n[l].style:null):null}var n={},r={eq:"operator",lt:"operator",le:"operator",gt:"operator",ge:"operator",in:"operator",ne:"operator",or:"operator"},s=/(<=|>=|!=|<>)/,o=/[=\(:\),{}.*<>+\-\/^\[\]]/;return e("def","stack pgm view source debug nesting nolist",["inDataStep"]),e("def","if while until for do do; end end; then else cancel",["inDataStep"]),e("def","label format _n_ _error_",["inDataStep"]),e("def","ALTER BUFNO BUFSIZE CNTLLEV COMPRESS DLDMGACTION ENCRYPT ENCRYPTKEY EXTENDOBSCOUNTER GENMAX GENNUM INDEX LABEL OBSBUF OUTREP PW PWREQ READ REPEMPTY REPLACE REUSE ROLE SORTEDBY SPILL TOBSNO TYPE WRITE FILECLOSE FIRSTOBS IN OBS POINTOBS WHERE WHEREUP IDXNAME IDXWHERE DROP KEEP RENAME",["inDataStep"]),e("def","filevar finfo finv fipname fipnamel fipstate first firstobs floor",["inDataStep"]),e("def","varfmt varinfmt varlabel varlen varname varnum varray varrayx vartype verify vformat vformatd vformatdx vformatn vformatnx vformatw vformatwx vformatx vinarray vinarrayx vinformat vinformatd vinformatdx vinformatn vinformatnx vinformatw vinformatwx vinformatx vlabel vlabelx vlength vlengthx vname vnamex vnferr vtype vtypex weekday",["inDataStep"]),e("def","zipfips zipname zipnamel zipstate",["inDataStep"]),e("def","put putc putn",["inDataStep"]),e("builtin","data run",["inDataStep"]),e("def","data",["inProc"]),e("def","%if %end %end; %else %else; %do %do; %then",["inMacro"]),e("builtin","proc run; quit; libname filename %macro %mend option options",["ALL"]),e("def","footnote title libname ods",["ALL"]),e("def","%let %put %global %sysfunc %eval ",["ALL"]),e("variable","&sysbuffr &syscc &syscharwidth &syscmd &sysdate &sysdate9 &sysday &sysdevic &sysdmg &sysdsn &sysencoding &sysenv &syserr &syserrortext &sysfilrc &syshostname &sysindex &sysinfo &sysjobid &syslast &syslckrc &syslibrc &syslogapplname &sysmacroname &sysmenv &sysmsg &sysncpu &sysodspath &sysparm &syspbuff &sysprocessid &sysprocessname &sysprocname &sysrc &sysscp &sysscpl &sysscpl &syssite &sysstartid &sysstartname &systcpiphostname &systime &sysuserid &sysver &sysvlong &sysvlong4 &syswarningtext",["ALL"]),e("def","source2 nosource2 page pageno pagesize",["ALL"]),e("def","_all_ _character_ _cmd_ _freq_ _i_ _infile_ _last_ _msg_ _null_ _numeric_ _temporary_ _type_ abort abs addr adjrsq airy alpha alter altlog altprint and arcos array arsin as atan attrc attrib attrn authserver autoexec awscontrol awsdef awsmenu awsmenumerge awstitle backward band base betainv between blocksize blshift bnot bor brshift bufno bufsize bxor by byerr byline byte calculated call cards cards4 catcache cbufno cdf ceil center cexist change chisq cinv class cleanup close cnonct cntllev coalesce codegen col collate collin column comamid comaux1 comaux2 comdef compbl compound compress config continue convert cos cosh cpuid create cross crosstab css curobs cv daccdb daccdbsl daccsl daccsyd dacctab dairy datalines datalines4 datejul datepart datetime day dbcslang dbcstype dclose ddm delete delimiter depdb depdbsl depsl depsyd deptab dequote descending descript design= device dflang dhms dif digamma dim dinfo display distinct dkricond dkrocond dlm dnum do dopen doptname doptnum dread drop dropnote dsname dsnferr echo else emaildlg emailid emailpw emailserver emailsys encrypt end endsas engine eof eov erf erfc error errorcheck errors exist exp fappend fclose fcol fdelete feedback fetch fetchobs fexist fget file fileclose fileexist filefmt filename fileref  fmterr fmtsearch fnonct fnote font fontalias  fopen foptname foptnum force formatted formchar formdelim formdlim forward fpoint fpos fput fread frewind frlen from fsep fuzz fwrite gaminv gamma getoption getvarc getvarn go goto group gwindow hbar hbound helpenv helploc hms honorappearance hosthelp hostprint hour hpct html hvar ibessel ibr id if index indexc indexw initcmd initstmt inner input inputc inputn inr insert int intck intnx into intrr invaliddata irr is jbessel join juldate keep kentb kurtosis label lag last lbound leave left length levels lgamma lib  library libref line linesize link list log log10 log2 logpdf logpmf logsdf lostcard lowcase lrecl ls macro macrogen maps mautosource max maxdec maxr mdy mean measures median memtype merge merror min minute missing missover mlogic mod mode model modify month mopen mort mprint mrecall msglevel msymtabmax mvarsize myy n nest netpv new news nmiss no nobatch nobs nocaps nocardimage nocenter nocharcode nocmdmac nocol nocum nodate nodbcs nodetails nodmr nodms nodmsbatch nodup nodupkey noduplicates noechoauto noequals noerrorabend noexitwindows nofullstimer noicon noimplmac noint nolist noloadlist nomiss nomlogic nomprint nomrecall nomsgcase nomstored nomultenvappl nonotes nonumber noobs noovp nopad nopercent noprint noprintinit normal norow norsasuser nosetinit  nosplash nosymbolgen note notes notitle notitles notsorted noverbose noxsync noxwait npv null number numkeys nummousekeys nway obs  on open     order ordinal otherwise out outer outp= output over ovp p(1 5 10 25 50 75 90 95 99) pad pad2  paired parm parmcards path pathdll pathname pdf peek peekc pfkey pmf point poisson poke position printer probbeta probbnml probchi probf probgam probhypr probit probnegb probnorm probsig probt procleave prt ps  pw pwreq qtr quote r ranbin rancau ranexp rangam range ranks rannor ranpoi rantbl rantri ranuni read recfm register regr remote remove rename repeat replace resolve retain return reuse reverse rewind right round rsquare rtf rtrace rtraceloc s s2 samploc sasautos sascontrol sasfrscr sasmsg sasmstore sasscript sasuser saving scan sdf second select selection separated seq serror set setcomm setot sign simple sin sinh siteinfo skewness skip sle sls sortedby sortpgm sortseq sortsize soundex  spedis splashlocation split spool sqrt start std stderr stdin stfips stimer stname stnamel stop stopover subgroup subpopn substr sum sumwgt symbol symbolgen symget symput sysget sysin sysleave sysmsg sysparm sysprint sysprintfont sysprod sysrc system t table tables tan tanh tapeclose tbufsize terminal test then timepart tinv  tnonct to today tol tooldef totper transformout translate trantab tranwrd trigamma trim trimn trunc truncover type unformatted uniform union until upcase update user usericon uss validate value var  weight when where while wincharset window work workinit workterm write wsum xsync xwait yearcutoff yes yyq  min max",["inDataStep","inProc"]),e("operator","and not ",["inDataStep","inProc"]),{startState:function(){return{inDataStep:!1,inProc:!1,inMacro:!1,nextword:!1,continueString:null,continueComment:!1}},token:function(e,n){return e.eatSpace()?null:t(e,n)},blockCommentStart:"/*",blockCommentEnd:"*/"}}),e.defineMIME("text/x-sas","sas")});