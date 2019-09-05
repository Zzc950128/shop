<template>
	<div class="login">
		<el-form label-position="right" label-width="80px" :model="loginData" :rules="rules" ref="ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="loginData.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="loginData.password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="rpsd" v-if="mode == 'register'">
				<el-input v-model="loginData.rpsd"></el-input>
			</el-form-item>
		</el-form>
		<el-button type="primary" size="mini" @click="loginHandle" v-loading="loading">删除</el-button>
	</div>
</template>
<script>
	import { userRegister, userLogin } from "@/api/sys"
	export default {
		name: "login",
		data() {
			const usernameValidate = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('用户名不能为空!'));
				} else {
					callback();
				}
			};
			const pwdValidate = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('密码不能为空!'));
				} else {
					callback();
				}
			};
			const rpwdValidate = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请确认密码!'));
				} else if (this.mode == "register" && value !== this.loginData.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				mode: null, // register login
				loginData: {
					username: null,
					password: null
				},
				rules: {
					username: [{ validator: usernameValidate, trigger: 'blur' }],
					password: [{ validator: pwdValidate, trigger: 'blur' }],
					rpsd: [{ validator: rpwdValidate, trigger: 'blur' }]
				},
				loading: false,
			}
		},
		computed: {
		},
		mounted() {
			window.vue = this
			if(this.$route.path == "/login") {
				this.mode = "login"
			}
			if(this.$route.path == "/register") {
				this.mode = "register"
			}
		},
		methods: {
			loginHandle() {
				if(this.mode == "register") {
					this.loading = true
					userRegister(this.loginData).then(res => {
						this.loading = false
						if(res.data.code == 0) {
						    this.$message({
	                            type: 'success',
	                            message: '注册成功'
	                        });
							this.$router.push({
	                        	path: "/home"
	                        })
						}
					}).catch(err => {
						this.loading = false
						console.log(err)
					})
				}
				if(this.mode == "login") {
					this.loading = true
					userLogin(this.loginData).then(res => {
						this.loading = false
						if(res.data.code == 0) {
						    this.$message({
	                            type: 'success',
	                            message: '登陆成功'
	                        });
				            this.$router.push({
			                    path: "/home"
			                })
						}
					}).catch(err => {
						this.loading = false
						console.log(err)
					})
				}
			}
		},
		components: {
		},
	}
</script>
<style lang="scss" scoped>
	
</style>