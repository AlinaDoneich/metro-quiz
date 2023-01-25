async function main(){
    const result = await supabaseClient.auth.getUser();
    if (result.error) {
        location.href = './login.html';
    }
}
main();